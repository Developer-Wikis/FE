import { MainType, SubType, SubWithAllType } from '~/utils/constant/category';

export interface IQuestionItem {
  id: number;
  title: string;
  mainCategory: MainType;
  subCategory: SubType;
  viewCount: number;
  commentCount: number;
  createdAt: string;
  isBookmarked: boolean;
}

export interface IQuestion {
  title: string;
  mainCategory: string;
  subCategory: string;
  tailQuestions: string[];
}

export interface IQuestionDetail extends IQuestionItem {
  tailQuestions: string[];
  prevId: number;
  nextId: number;
}

export interface ICategoryQuery {
  mainCategory: MainType;
  subCategory: SubWithAllType;
}
