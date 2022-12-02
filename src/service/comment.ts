import { CommentEditPayload, CommentType } from '~/types/comment';
import { unauth, auth } from './base';

const commentApi = {
  getList(questionId: number) {
    return unauth.get(`/questions/${questionId}/comments`).then((res) => res.data);
  },
  create({ questionId, payload }: { questionId: number; payload: CommentType }) {
    return auth.post(`/questions/${questionId}/comments`, payload).then((res) => res.data);
  },
  edit({
    questionId,
    commentId,
    payload,
  }: {
    questionId: number;
    commentId: number;
    payload: CommentEditPayload;
  }) {
    return auth.put(`/questions/${questionId}/comments/${commentId}1`, payload);
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
