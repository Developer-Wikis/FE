import styled from '@emotion/styled';
import { useContext } from 'react';
import Icon from '~/components/base/Icon';
import useCommentHandler from '~/hooks/useCommentHandler';
import { useUser } from '~/react-query/hooks/useUser';
import { ICommentItem } from '~/types/comment';
import { formatDate } from '~/utils/helper/formatting';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { CommentContext } from './context';

interface CommentContentProps {
  comment: ICommentItem;
}
const CommentContent = ({ comment }: CommentContentProps) => {
  const { user } = useUser();
  const { onOpenPassword, onOpenEditor, onDeleteComment, onCloseEditor, onClosePassword } =
    useCommentHandler();

  const { passwordState } = useContext(CommentContext);
  const isAnonymous = comment.role === 'ANONYMOUS';
  const isMyComment = user && user.id === comment.userId;

  const handleDelete = () => {
    if (passwordState.action === 'edit' && passwordState.password) {
      if (confirm('수정한 내용이 있다면 초기화됩니다. 계속하시겠습니까?')) {
        onCloseEditor();
      } else {
        return;
      }
    }

    if (isAnonymous) {
      onOpenPassword(comment.id, 'delete');
      return;
    }
    onDeleteComment({ commentId: comment.id });
  };

  const handleEditStart = () => {
    if (passwordState.action === 'delete') {
      onClosePassword();
    }

    if (passwordState.password) {
      if (confirm('수정한 내용이 있다면 초기화됩니다. 계속하시겠습니까?')) {
        onCloseEditor();
      } else {
        return;
      }
    }

    if (isAnonymous) {
      onOpenPassword(comment.id, 'edit');
      return;
    }
    onOpenEditor(comment.id);
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
