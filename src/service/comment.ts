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
  }): Promise<undefined> {
    return auth
      .put(`/questions/${questionId}/comments/${commentId}`, payload)
      .then((res) => res.data);
  },
  async delete({ questionId, commentId, password }: CommentPayload): Promise<undefined> {
    return auth
      .delete(`/questions/${questionId}/comments/${commentId}`, {
        data: { password },
      })
      .then((res) => res.data);
  },
  checkPassword({ questionId, commentId, password }: CommentPayload): Promise<boolean> {
    return unauth
      .post(`/questions/${questionId}/comments/${commentId}/check`, {
        password,
      })
      .then((res) => res.data);
  },
};

export default commentApi;
