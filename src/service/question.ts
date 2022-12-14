import { auth, unauth } from './base';
import { IQuestion, IQuestionItem, ICategoryQuery, IQuestionDetail } from '~/types/question';
import { MainType } from '~/utils/constant/category';
import { AxiosResponse } from 'axios';
import { Paging } from '~/types/utilityType';

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
    signal?: AbortSignal,
  ): Promise<Paging<IQuestionItem>> {
    return auth.get('/questions', { params, signal }).then((res) => res.data);
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
