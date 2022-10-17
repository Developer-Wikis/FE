import { unauth } from './base';
import { IQuestion, IQuestionItem, ISort } from '~/types/question';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import axios from 'axios';

type QuestionListResponse = {
  content: IQuestionItem[];
  pageable: {
    sort: ISort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  sort: ISort;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

type QuestionDetailResponse = IQuestionItem & {
  additionQuestions: string[];
};

export const createQuestion = (question: IQuestion) => {
  return unauth.post<{ id: number }>('/questions', question);
};

export const deleteQuestion = (questionId: number, password: string) => {
  return unauth.delete(`/questions/${questionId}`, { data: { password } });
};

export const getQuestionDetail = (
  questionId: number,
  params: { mainCategory: MainType; subCategory: SubWithAllType },
) => {
  return unauth.get<QuestionDetailResponse>(`/questions/${questionId}`, { params });
};

export const editQuestion = (questionId: number, question: Omit<IQuestion, 'nickname'>) => {
  return unauth.put(`/questions/${questionId}`, question);
};

export const matchQuestionPassword = (questionId: number, password: string) => {
  return unauth.post(`/questions/${questionId}/match`, { password });
};

export const getQuestionList = (params: {
  mainCategory: MainType;
  subCategory: SubWithAllType;
  page: number;
}) => {
  return unauth.get<QuestionListResponse>('/questions', { params });
};

export const getRandomQuestions = (params: { mainCategory: MainType; subCategories: string }) => {
  // 실제 API 연결 시 unauth로 변경
  return axios.get('/random', { params });
};

export const createTailQuestion = (questionId: number, text: string) => {
  return unauth.post(`/questions/${questionId}/tail`, { tailQuestion: text });
};
