import styled from '@emotion/styled';
import { useContext } from 'react';
import Icon from '~/components/base/Icon';
import PasswordConfirm from '~/components/domain/question/PasswordConfirm';
import { ICommentItem } from '~/types/comment';
import { formatDate } from '~/utils/helper/formatting';
import { CommentContext } from './context';
import EditCommentForm from './EditCommentForm';

interface CommentListProps {
  commentId: number;
  comment: ICommentItem;
}

const CommentItem = ({ commentId, comment }: CommentListProps) => {
  const { onOpenPassword, editId, passwordState } = useContext(CommentContext);

  const handleDelete = () => {
    onOpenPassword(commentId, 'delete');
  };

  const handleEditStart = () => {
    onOpenPassword(commentId, 'edit');
  };

  return (
    <StyledLi>
      <CommentContainer>
        <Writer>
          <span title={comment.nickname}>{comment.nickname}</span>
        </Writer>
        {editId !== commentId ? (
          <>
            <Content>
              <p>{comment.content}</p>
            </Content>
            <Info>
              <CreatedAt>{formatDate(comment.createdAt)}</CreatedAt>
              <Icon.Button name="Pencil" color="mediumGray" size="25" onClick={handleEditStart} />
              <Icon.Button name="Close" color="mediumGray" size="12" onClick={handleDelete} />
            </Info>
          </>
        ) : (
          <EditorContainer>
            <EditCommentForm defaultValue={comment.content} commentId={commentId} />
          </EditorContainer>
        )}

        {passwordState.commentId === commentId && <PasswordConfirm commentId={commentId} />}
      </CommentContainer>
    </StyledLi>
  );
};

export default CommentItem;

const StyledLi = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const EditorContainer = styled.div`
  flex-grow: 1;
`;

const Writer = styled.div`
  margin-left: 16px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.darkGray};
  flex-shrink: 0;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 16px;

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
  gap: 4px;
  color: ${({ theme }) => theme.colors.mediumGray};
  align-self: flex-start;
`;

const CreatedAt = styled.span`
  font-size: 14px;
`;
