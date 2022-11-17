import { auth } from './base';

const userApi = {
  getUserInfo: () => {
    return auth.get('/user').then((res) => res.data);
  },
  deleteAccount: (userId: number) => {
    return auth.delete(`/user/${userId}`).then((res) => res.data);
  },
};

export default userApi;
