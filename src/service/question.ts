import { unauth } from './base';
import { IQuestion, IQuestionItem, ICategoryQuery, IQuestionDetail } from '~/types/question';
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
  getDetail(id: number, params: ICategoryQuery): Promise<IQuestionDetail> {
    return unauth.get(`/questions/${id}`, { params }).then((res) => res.data);
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
  totalPages: number;
  totalElements: number;
};
type TDetail = IQuestionItem & {
  tailQuestions: string[];
};
