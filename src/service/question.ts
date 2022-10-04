import { unauth } from './base';
import { IQuestion, IQuestionItem, ISort } from '~/types/question';

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

export const getQuestionDetail = (questionId: number, category: string) => {
  return unauth.get<QuestionDetailResponse>(`/questions/${questionId}?category=${category}`);
};

export const editQuestion = (questionId: number, question: Omit<IQuestion, 'nickname'>) => {
  return unauth.put(`/questions/${questionId}`, question);
};

export const matchQuestionPassword = (questionId: number, password: string) => {
  return unauth.post(`/questions/${questionId}/match`, { password });
};

export const getQuestionList = ({ category, page }: { category: string; page: number }) => {
  return unauth.get<QuestionListResponse>(`/questions?category=${category}&page=${page}`);
};
