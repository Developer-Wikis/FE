import { useContext } from 'react';
import { CommentContext } from '~/components/common/Comment/context';
import { useDeleteComment, useEditComment } from '~/react-query/hooks/useComment';
import { useUser } from '~/react-query/hooks/useUser';
import commentApi from '~/service/comment';
import { CommentActionType } from '~/types/comment';

const useCommentHandler = () => {
  const { passwordState, updatePasswordState, updateEditId, resetPasswordState, questionId } =
    useContext(CommentContext);
  const { deleteComment, isLoading: isLoadingDelete } = useDeleteComment(questionId);
  const { editComment, isLoading: isLoadingEdit } = useEditComment(questionId);

  const { user } = useUser();

  const onOpenPassword = (commentId: number | null, action: CommentActionType) => {
    updatePasswordState({ commentId, action, password: '' });
  };

  const onClosePassword = () => {
    resetPasswordState();
  };

  const onCloseEditor = () => {
    resetPasswordState();
  };

  const onOpenEditor = (commentId: number) => {
    updateEditId(commentId);
  };

  const onDeleteComment = async (payload: { commentId: number; password?: string }) => {
    await deleteComment(payload);
    resetPasswordState();
  };

  const onSubmitPassword = async (payload: { commentId: number; password: string }) => {
    if (passwordState.action === 'delete') {
      onDeleteComment(payload);
      return;
    }

    if (passwordState.action === 'edit') {
      try {
        const isCorrectPassword = await commentApi.checkPassword({
          questionId,
          commentId: payload.commentId,
          password: payload.password,
        });

        if (isCorrectPassword.data) {
          onOpenEditor(payload.commentId);
          updatePasswordState({ commentId: null, action: 'edit', password: payload.password });
        } else {
          alert('비밀번호가 일치하지 않습니다.');
        }
      } catch (e) {
        // 상태코드에 따라 다르게 에러 출력하기
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const onSubmitEdit = async (commentId: number, content: string) => {
    if (user) {
      await editComment({ commentId, payload: { content } });
    } else {
      await editComment({ commentId, payload: { password: passwordState.password, content } });
    }

    // 위 에러 시 아래 코드 실행 안됨
    onCloseEditor();
  };

  return {
    onOpenPassword,
    onOpenEditor,
    onSubmitPassword,
    onSubmitEdit,
    onClosePassword,
    onDeleteComment,
    onCloseEditor,
    isLoadingEdit,
    isLoadingDelete,
  };
};

export default useCommentHandler;
