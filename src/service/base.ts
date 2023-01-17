import axios, { AxiosInstance } from 'axios';
import {
  handleAuthResponseError,
  handleAuthRequest,
  handleAuthResponse,
  handleAuthRequestError,
} from './handler';

const baseURL = `${process.env.BASE_URL}`;

const createInstance = () => {
  return axios.create({
    baseURL,
  });
};

const authConfig = (instance: AxiosInstance) => {
  instance.interceptors.request.use(handleAuthRequest, handleAuthRequestError);

  instance.interceptors.response.use(handleAuthResponse, handleAuthResponseError);
  return instance;
};

const unauth = createInstance();
const auth = authConfig(createInstance());

export { unauth, auth };
