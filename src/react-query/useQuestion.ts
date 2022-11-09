import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import questionApi from '~/service/question';
import { ICategoryQuery } from '~/types/question';
import { QUERY_KEY } from './queryKey';

export const useQuestionDetail = (questionId: number, query: ICategoryQuery) => {
  const queryFn = () => questionApi.getDetail(questionId, query);
  const router = useRouter();

  const { data: detailData } = useQuery([QUERY_KEY.questionDetail, questionId], {
    queryFn,
    onError: () => {
      alert('서버에 문제가 있습니다.');
      router.push('/');
    },
  });

  return {
    detailData,
  };
};
