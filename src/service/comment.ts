import { unauth } from './base';
import { ICommentItem } from '~/types/comment';

export const getCommentList = (questionId: number) => {
  return unauth.get(`/questions/${questionId}/comments`);
};

export const createComment = (
  questionId: number,
  payload: { nickname: string; password: string; content: string },
) => {
  return unauth.post(`/questions/${questionId}/comments`, payload);
};

export const matchCommentPassword = (questionId: number, commentId: number, password: string) => {
  return unauth.post(`/questions/${questionId}/comments/${commentId}`, {
    password,
  });
};

export const editComment = (
  questionId: number,
  commentId: number,
  payload: { password: string; content: string },
) => {
  return unauth.put(`/questions/${questionId}/comments/${commentId}`, payload);
};

export const deleteComment = (questionId: number, commentId: number, password: string) => {
  return unauth.delete(`/questions/${questionId}/comments/${commentId}`, { data: { password } });
};
