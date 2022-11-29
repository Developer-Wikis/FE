import { IProfileCommentItem } from '~/types/comment';
import { IQuestionItem } from '~/types/question';
import { Paging } from '~/types/utilityType';
import { auth } from './base';

const userApi = {
  getUserInfo: () => {
    return auth.get('/user').then((res) => res.data);
  },
  deleteAccount: (userId: number) => {
    return auth.delete(`/user/${userId}`).then((res) => res.data);
  },
  editUsername: ({ userId, username }: { userId: number; username: string }) => {
    return auth.post(`/user/username/${userId}`, { username: username }).then((res) => res.data);
  },
  editProfileImage: ({ userId, formData }: { userId: number; formData: FormData }) => {
    return auth.post(`/user/image/${userId}`, formData).then((res) => res.data);
  },
  editProfileDefaultImage: (userId: number) => {
    return auth.put(`/user/profile/default/${userId}`).then((res) => res.data);
  },
  getBookmark: (params: {
    mainCategory: string;
    subCategory: string;
    page: number;
  }): Promise<Paging<IQuestionItem>> => {
    return auth.get('/questions/bookmark', { params }).then((res) => res.data);
  },
  getComment: (params: { page: number }): Promise<Paging<IProfileCommentItem>> => {
    return auth.get('/user/comment', { params }).then((res) => res.data);
  },
};

export default userApi;
