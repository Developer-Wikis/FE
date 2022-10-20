import { MainType, SubType, SubWithAllType } from '~/utils/constant/category';

export interface IQuestionItem {
  id: number;
  title: string;
  nickname: string;
  mainCategory: MainType;
  subCategory: SubType;
  viewCount: number;
  commentCount: number;
  createAt: string;
}

export interface IQuestion {
  title: string;
  mainCategory: string;
  subCategory: string;
  tailQuestions: string[];
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface IQuestionDetail {
  id: number;
  nickname: string;
  title: string;
  mainCategory: MainType;
  subCategory: SubType;
  tailQuestions: string[];
  viewCount: number;
  commentCount: number;
  createdAt: string;
  prevId: number;
  nextId: number;
}

export interface QuestionCategoryQuery {
  mainCategory: MainType;
  subCategory: SubWithAllType;
}
