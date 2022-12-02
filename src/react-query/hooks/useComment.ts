import commentApi from '~/service/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey';
import { CommentEditPayload, CommentType } from '~/types/comment';

export const useComment = (questionId: number) => {
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

export const useAddComment = (questionId: number) => {
  const queryClient = useQueryClient();

  const mutationFn = (payload: CommentType) => commentApi.create({ questionId, payload });

  const { mutateAsync: addComment, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.comments]);
    },
    onError: () => {
      alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    addComment,
    isLoading,
  };
};

export const useEditComment = (questionId: number) => {
  const queryClient = useQueryClient();

  const mutationFn = ({ commentId, payload }: { commentId: number; payload: CommentEditPayload }) =>
    commentApi.edit({ questionId, commentId, payload });

  const { mutateAsync: editComment, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.comments]);
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    editComment,
    isLoading,
  };
};
