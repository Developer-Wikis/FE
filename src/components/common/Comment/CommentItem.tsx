import styled from '@emotion/styled';
import { useContext } from 'react';
import { ICommentItem } from '~/types/comment';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import CommentContent from './CommentContent';
import { CommentContext } from './context';
import EditCommentForm from './EditCommentForm';
import PasswordConfirm from './PasswordConfirm';

interface CommentListProps {
  commentId: number;
  comment: ICommentItem;
}

const CommentItem = ({ commentId, comment }: CommentListProps) => {
  const { editId, passwordState } = useContext(CommentContext);

  return (
    <StyledLi>
      <CommentContainer>
        <Writer>
          <span title={comment.nickname}>{comment.nickname}</span>
        </Writer>
        {editId !== commentId ? (
          <CommentContent
            commentId={commentId}
            content={comment.content}
            createdAt={comment.createdAt}
          />
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  position: relative;
`;

const CommentContainer = styled.div`
  display: flex;

  ${mediaQuery('sm')} {
    flex-direction: column;
  }
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
  color: ${({ theme }) => theme.colors.gray600};
  flex-shrink: 0;

  ${mediaQuery('sm')} {
    margin-bottom: 6px;
  }
`;
