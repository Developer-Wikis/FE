import { MainType, SubType } from '~/utils/constant/category';

export interface ICommentItem {
  id: number;
  username: string;
  role: 'ANONYMOUS' | 'USER';
  userId: number;
  content: string;
  createdAt: string;
}

export interface IProfileCommentItem extends ICommentItem {
  title: string;
  mainCategory: MainType;
  subCategory: SubType;
  questionId: number;
}
