import useStorage from '~/hooks/useStorage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { LOCAL_KEY } from '~/utils/constant/user';

const baseURL = `${process.env.BASE_URL}`;
const storage = useStorage('local');

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const getRefreshToken = async () => {
  try {
    const refresh = storage.getItem(LOCAL_KEY.refresh);
    const access = storage.getItem(LOCAL_KEY.token);
    const { data } = await axios.post<RefreshResponse>(
      '/refreshToken',
      {
        accessToken: access,
        refreshToken: refresh,
      },
      {
        baseURL: baseURL,
      },
    );

    console.log(data, 'data');

    storage.setItem(LOCAL_KEY.token, data.accessToken);
    storage.setItem(LOCAL_KEY.refresh, data.refreshToken);

    return data.accessToken;
  } catch (e) {
    console.log('세션이 만료되었습니다.');
    storage.removeItem(LOCAL_KEY.token);
    storage.removeItem(LOCAL_KEY.refresh);
  }
};

const authConfig = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = storage.getItem(LOCAL_KEY.token, '');
      config.headers = {
        Authorization: `Bearer ${token}` || '',
      };

      return config;
    },
    (error) => Promise.reject(error.response),
  );

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest: AxiosRequestConfig = error.config;

      /** refresh 실패할 경우 */
      if (originalRequest.url === '/refreshToken' || error.response?.status !== 401) {
        console.log('세션이 만료되었습니다.');
        return Promise.reject(error.response);
      }

      const accessToken = await getRefreshToken();

      if (accessToken) {
        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
        // 재요청
        return axios(originalRequest);
      }

      // return Promise.reject(error);
    },
  );
  return instance;
};

const unauth = axios.create({ baseURL });
const auth = authConfig(axios.create({ baseURL }));

export { unauth, auth };
