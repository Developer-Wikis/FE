import { LOCAL_KEY } from '~/utils/constant/user';
import useStorage from '~/hooks/useStorage';
import axios from 'axios';

const storage = useStorage('local');
const token = storage.getItem(LOCAL_KEY.token, '');

const authHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserInfo = (token: string) => {
  return axios.get('/user', authHeader(token)).then((res) => res.data);
};
