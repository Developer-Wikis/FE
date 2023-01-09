import styled from '@emotion/styled';
import { useContext } from 'react';
import Icon from '~/components/base/Icon';
import { DeleteComment } from '~/react-query/hooks/useComment';
import { ICommentItem } from '~/types/comment';
import { IUser } from '~/types/user';
import { Nullable } from '~/types/utilityType';
import { formatDate } from '~/utils/helper/formatting';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { CommentContext } from './context';

interface CommentContentProps {
  comment: ICommentItem;
  deleteComment: DeleteComment;
  user: Nullable<IUser>;
}
const CommentContent = ({ user, comment, deleteComment }: CommentContentProps) => {
  const { openPassword, openEditor, closeEditor, closePassword } = useContext(CommentContext);

  const { passwordState, editId } = useContext(CommentContext);
  const isAnonymous = comment.role === 'ANONYMOUS';
  const isMyComment = user && user.id === comment.userId;

  const handleDelete = async () => {
    if (editId) {
      if (confirm('수정한 내용이 있다면 초기화됩니다. 계속하시겠습니까?')) {
        closeEditor();
      } else {
        return;
      }
    }

    if (isAnonymous) {
      openPassword(comment.id, 'delete');
      return;
    }

    if (confirm('댓글을 삭제하시겠습니까?')) {
      await deleteComment.mutateAsync({ commentId: comment.id });
      closePassword();
    }
  };

  const handleEditStart = () => {
    if (passwordState.action === 'delete') {
      closePassword();
    }

    if (passwordState.password) {
      if (confirm('수정한 내용이 있다면 초기화됩니다. 계속하시겠습니까?')) {
        closeEditor();
      } else {
        return;
      }
    }
    if (isAnonymous) {
      openPassword(comment.id, 'edit');

      return;
    }
    openEditor(comment.id);
  };

  return (
    <>
      <Content>
        <p>{comment.content}</p>
      </Content>
      <Info>
        <CreatedAt>{formatDate(comment.createdAt)}</CreatedAt>
        {(isAnonymous || isMyComment) && (
          <Buttons>
            <Icon.Button name="Pencil" color="gray500" size="25" onClick={handleEditStart} />
            <Icon.Button name="Close" color="gray500" size="12" onClick={handleDelete} />
          </Buttons>
        )}
      </Info>
    </>
  );
};

export default CommentContent;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.gray800};

  p {
    word-break: break-all;
    white-space: pre-wrap;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  margin-left: 16px;
  margin-right: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray500};
  align-self: flex-start;
`;

const CreatedAt = styled.span`
  ${({ theme }) => theme.fontStyle.body2};
  margin-right: 4px;

  ${mediaQuery('sm')} {
    margin-top: 6px;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;

  ${mediaQuery('sm')} {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  button {
    margin-right: 4px;
  }
`;
