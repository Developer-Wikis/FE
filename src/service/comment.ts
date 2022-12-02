import { CommentEditPayload, CommentType } from '~/types/comment';
import { unauth, auth } from './base';

interface CommentPayload {
  questionId: number;
  commentId: number;
  password?: string;
}

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
    return auth.put(`/questions/${questionId}/comments/${commentId}`, payload);
  },
  delete({ questionId, commentId, password }: CommentPayload) {
    return unauth.delete(`/questions/${questionId}/comments/${commentId}`, { data: { password } });
  },
  checkPassword({ questionId, commentId, password }: CommentPayload) {
    return unauth.post(`/questions/${questionId}/comments/${commentId}/check`, {
      password,
    });
  },
};

export default commentApi;
