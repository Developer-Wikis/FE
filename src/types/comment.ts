import { MainType, SubType } from '~/utils/constant/category';

export interface ICommentItem {
  id: number;
  username: string;
  role: 'ANONYMOUS' | 'USER';
  userId: number;
  content: string;
  profileUrl: string;
  createdAt: string;
}

interface AnonymousComment {
  nickname: string;
  password: string;
  content: string;
}

interface UserComment {
  content: string;
}

export type CommentType = AnonymousComment | UserComment;

export interface CommentEditPayload {
  password?: string;
  content: string;
}

export type CommentActionType = 'delete' | 'edit' | '';

export interface IProfileCommentItem extends ICommentItem {
  title: string;
  mainCategory: MainType;
  subCategory: SubType;
  questionId: number;
}
