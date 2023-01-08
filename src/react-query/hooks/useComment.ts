import commentApi from '~/service/comment';
import { MutationFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../queryKey';
import { CommentEditPayload, CommentType, ICommentItem } from '~/types/comment';
import useAuthMutation from './useAuthMutation';

export const useGetComment = (questionId: number) => {
  const queryFn = () => commentApi.getList(questionId);

  const { data: comments = [], refetch: updateComments } = useQuery<ICommentItem[]>(
    [QUERY_KEY.comments, questionId],
    {
      queryFn,
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

  const { mutateAsync: addComment, isLoading } = useAuthMutation(mutationFn, {
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

export interface EditCommentPayload {
  commentId: number;
  payload: CommentEditPayload;
}

export interface EditComment {
  mutateAsync: MutationFunction<undefined, EditCommentPayload>;
  isLoading: boolean;
}

export const useEditComment = (questionId: number): EditComment => {
  const queryClient = useQueryClient();

  const mutationFn = ({ commentId, payload }: { commentId: number; payload: CommentEditPayload }) =>
    commentApi.edit({ questionId, commentId, payload });

  const { mutateAsync, isLoading } = useAuthMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.comments]);
    },
    onError: () => {
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export interface DeleteCommentPayload {
  commentId: number;
  password?: string;
}

export interface DeleteComment {
  mutateAsync: MutationFunction<undefined, DeleteCommentPayload>;
  isLoading: boolean;
}

export const useDeleteComment = (questionId: number): DeleteComment => {
  const queryClient = useQueryClient();

  const mutationFn = (payload: { commentId: number; password?: string }) =>
    commentApi.delete({ questionId, ...payload });

  const { mutateAsync, isLoading } = useAuthMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.comments]);
    },
    onError: () => {
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export interface CheckPasswordPayload {
  commentId: number;
  password: string;
}

export interface CheckPassword {
  mutateAsync: MutationFunction<boolean, CheckPasswordPayload>;
  isLoading: boolean;
}

export const useCheckPassword = (questionId: number): CheckPassword => {
  const queryFn = ({ commentId, password }: { commentId: number; password: string }) =>
    commentApi.checkPassword({ questionId, commentId, password });

  const { mutateAsync, isLoading } = useMutation(queryFn, {
    onError: () => {
      alert('비밀번호 확인에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};
