import { unauth } from './base';

const commentApi = {
  getList(questionId: number) {
    return unauth.get(`/questions/${questionId}/comments`);
  },
  create(questionId: number, payload: { nickname: string; password: string; content: string }) {
    return unauth.post(`/questions/${questionId}/comments`, payload);
  },
  edit(questionId: number, commentId: number, payload: { password: string; content: string }) {
    return unauth.put(`/questions/${questionId}/comments/${commentId}`, payload);
  },
  delete(questionId: number, commentId: number, password: string) {
    return unauth.delete(`/questions/${questionId}/comments/${commentId}`, { data: { password } });
  },
  checkPassword(questionId: number, commentId: number, password: string) {
    return unauth.post(`/questions/${questionId}/comments/${commentId}/check`, {
      password,
    });
  },
};

export default commentApi;
