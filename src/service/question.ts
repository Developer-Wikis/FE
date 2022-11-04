import { unauth } from './base';
import { IQuestion, IQuestionItem, ICategoryQuery } from '~/types/question';
import { MainType } from '~/utils/constant/category';
import { AxiosResponse } from 'axios';

const questionApi = {
  create(question: IQuestion): RequestType<{ id: number }> {
    return unauth.post('/questions', question);
  },
  edit(id: number, question: Omit<IQuestion, 'nickname'>) {
    return unauth.put(`/questions/${id}`, question);
  },
  getList(
    params: ICategoryQuery & {
      page: number;
    },
  ): RequestType<TList> {
    return unauth.get('/questions', { params });
  },
  getDetail(id: number, params: ICategoryQuery): RequestType<TDetail> {
    return unauth.get(`/questions/${id}`, { params });
  },
  getRandom(params: { mainCategory: MainType; subCategory: string }) {
    return unauth.get('/questions/random', { params });
  },
  createTail(id: number, text: string) {
    return unauth.post(`/questions/${id}/tail`, { tailQuestion: text });
  },
};

export default questionApi;

type RequestType<T> = Promise<AxiosResponse<T, any>>;
type TList = {
  content: IQuestionItem[];
  last: boolean;
};
type TDetail = IQuestionItem & {
  tailQuestions: string[];
};
