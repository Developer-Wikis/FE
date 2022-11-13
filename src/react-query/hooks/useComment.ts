import commentApi from '~/service/comment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey';

export const useComment = (questionId: number) => {
  const queryClient = useQueryClient();

  const queryFn = () => commentApi.getList(questionId);

  const { data: comments = [], refetch: updateComments } = useQuery(
    [QUERY_KEY.comments, questionId],
    {
      queryFn,
      onError: () => {
        /* toast로 변경 */
        alert('댓글 목록을 가져오는데에 실패하였습니다.');
      },
      staleTime: 0,
    },
  );

  return {
    comments,
    updateComments,
  };
};
