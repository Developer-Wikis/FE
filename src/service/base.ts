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

    storage.setItem(LOCAL_KEY.token, data.accessToken);
    storage.setItem(LOCAL_KEY.refresh, data.refreshToken);

    return data.accessToken;
  } catch (e) {
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
      if (originalRequest.url === '/refreshToken' && error.response?.status === 403) {
        return Promise.reject(error.response);
      }

      if (error.response?.status === 401) {
        const accessToken = await getRefreshToken();

        if (accessToken) {
          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );
  return instance;
};

const unauth = axios.create({ baseURL });
const auth = authConfig(axios.create({ baseURL }));

export { unauth, auth };
