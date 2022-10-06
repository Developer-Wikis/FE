import styled from '@emotion/styled';
import { useContext } from 'react';
import PasswordConfirm from '~/components/domain/question/PasswordConfirm';
import { ICommentItem } from '~/types/comment';
import CommentContent from './CommentContent';
import { CommentContext } from './context';
import EditCommentForm from './EditCommentForm';

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
