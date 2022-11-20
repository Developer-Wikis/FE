import useStorage from '~/hooks/useStorage';
import axios, { AxiosInstance } from 'axios';
import { LOCAL_KEY } from '~/utils/constant/user';

const baseURL = `${process.env.BASE_URL}`;
const storage = useStorage('local');

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

  return instance;
};

const unauth = axios.create({ baseURL });
const auth = authConfig(axios.create({ baseURL }));

export { unauth, auth };
