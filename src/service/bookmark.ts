import { auth } from './base';

const bookmarkApi = {
  bookmark(questionId: number): Promise<boolean> {
    return auth.post(`/bookmarks/${questionId}`).then((res) => res.data);
  },
  getBookmark(questionId: number, signal?: AbortSignal): Promise<boolean> {
    return auth.get(`/bookmarks/${questionId}`, { signal }).then((res) => res.data);
  },
};

export default bookmarkApi;
