import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import PasswordConfirm from '~/components/domain/question/PasswordConfirm';
import { ICommentItem } from '~/types/comment';
import { formatDate } from '~/utils/helper/formatting';
import EditCommentForm from './EditCommentForm';

interface CommentListProps {
  id: number;
  comment: ICommentItem;
  onOpenPassword: (id: number | null, action: 'edit' | 'delete' | '') => void;
  isPasswordCheck: boolean;
  isEditing: boolean;
  onSubmitPassword: (id: number, password: string) => void;
  onEditComment: (commentId: number, content: string) => void;
  onCancelEdit: () => void;
}
const CommentItem = ({
  id,
  comment,
  onOpenPassword,
  isPasswordCheck,
  onSubmitPassword,
  isEditing,
  onEditComment,
  onCancelEdit,
}: CommentListProps) => {
  const handleDelete = () => {
    onOpenPassword(id, 'delete');
  };

  const handleSubmitPassword = (password: string) => {
    onSubmitPassword(id, password);
  };

  const handleClose = () => {
    onOpenPassword(null, '');
  };

  const handleEditStart = () => {
    onOpenPassword(id, 'edit');
  };

  const handleEdit = (content: string) => {
    onEditComment(id, content);
  };

  return (
    <StyledLi>
      <CommentContainer>
        <Writer>
          <span title={comment.nickname}>{comment.nickname}</span>
        </Writer>
        {!isEditing ? (
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
            <EditCommentForm
              defaultValue={comment.content}
              onSubmitEdit={handleEdit}
              onCancelEdit={onCancelEdit}
            />
          </EditorContainer>
        )}

        {isPasswordCheck && (
          <PasswordConfirm handleSubmitPassword={handleSubmitPassword} handleClose={handleClose} />
        )}
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
