import { auth } from './base';

const bookmarkApi = {
  bookmark(questionId: number) {
    return auth.post(`/bookmarks/${questionId}`).then((res) => res.data);
  },
};

export default bookmarkApi;
