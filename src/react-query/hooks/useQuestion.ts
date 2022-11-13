import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import questionApi from '~/service/question';
import { ICategoryQuery } from '~/types/question';
import { QUERY_KEY } from '../queryKey';

interface QuestionDetailQueryKey {
  queryKey: [string, number, ICategoryQuery];
}

export const useQuestionDetail = (questionId: number, query: ICategoryQuery) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const queryFn = ({ queryKey }: QuestionDetailQueryKey) => {
    const [_key, questionId, query] = queryKey;
    return questionApi.getDetail(questionId, query);
  };

  const prefetchDetail = (nextOrPrevId: number) => {
    queryClient.prefetchQuery([QUERY_KEY.questionDetail, nextOrPrevId, query], queryFn);
  };

  const { data: detailData } = useQuery([QUERY_KEY.questionDetail, questionId, query], {
    queryFn,
    onError: () => {
      alert('서버에 문제가 있습니다.');
      router.push('/');
    },
  });

  return {
    detailData,
    prefetchDetail,
  };
};
