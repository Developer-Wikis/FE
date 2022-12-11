import styled from '@emotion/styled';
import { useContext } from 'react';
import { CheckPassword, DeleteComment, EditComment } from '~/react-query/hooks/useComment';
import { ICommentItem } from '~/types/comment';
import { IUser } from '~/types/user';
import { Nullable } from '~/types/utilityType';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import UserProfile from '../UserProfile';
import CommentContent from './CommentContent';
import { CommentContext } from './context';
import EditCommentForm from './EditCommentForm';
import PasswordConfirm from './PasswordConfirm';

interface CommentListProps {
  comment: ICommentItem;
  deleteComment: DeleteComment;
  editComment: EditComment;
  checkPassword: CheckPassword;
  user: Nullable<IUser>;
}

const CommentItem = ({
  comment,
  deleteComment,
  editComment,
  checkPassword,
  user,
}: CommentListProps) => {
  const { editId, passwordState } = useContext(CommentContext);

  const isShowPasswordInput = passwordState.commentId === comment.id;
  const isShowEditor = editId !== comment.id;

  return (
    <StyledLi>
      <CommentContainer>
        <Writer>
          {comment.userId ? (
            <UserProfile
              profileUrl={comment.profileUrl}
              avatarSize="sm"
              fontSize="sm"
              text={comment.username}
            />
          ) : (
            <span title={comment.username}>{comment.username}</span>
          )}
        </Writer>
        {isShowEditor ? (
          <CommentContent user={user} comment={comment} deleteComment={deleteComment} />
        ) : (
          <EditorContainer>
            <EditCommentForm
              user={user}
              defaultValue={comment.content}
              commentId={comment.id}
              editComment={editComment}
            />
          </EditorContainer>
        )}
        {isShowPasswordInput && (
          <PasswordConfirm
            commentId={comment.id}
            deleteComment={deleteComment}
            checkPassword={checkPassword}
          />
        )}
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
