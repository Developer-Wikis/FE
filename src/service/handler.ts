import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useStorage from '~/hooks/useStorage';
import { LOCAL_KEY } from '~/utils/constant/user';
import getRefreshToken from './token';

const storage = useStorage('local');

const handleAuthRequest = (config: AxiosRequestConfig) => {
  const token = storage.getItem(LOCAL_KEY.token, '');
  config.headers = {
    Authorization: `Bearer ${token}` || '',
  };

  return config;
};

const handleAuthResponseError = async (error: AxiosError) => {
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
};

const handleAuthResponse = (res: AxiosResponse) => res;
const handleAuthRequestError = (error: AxiosError) => Promise.reject(error.response);

export { handleAuthResponse, handleAuthResponseError, handleAuthRequest, handleAuthRequestError };
