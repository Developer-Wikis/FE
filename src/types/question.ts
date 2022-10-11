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
  nickname: string;
  password: string;
  title: string;
  mainCategory: string;
  subCategory: string;
  additionQuestions: string[];
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
  additionQuestions: string[];
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
