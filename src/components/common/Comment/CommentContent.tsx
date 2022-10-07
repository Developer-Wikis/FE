import styled from '@emotion/styled';
import { useContext } from 'react';
import Icon from '~/components/base/Icon';
import { formatDate } from '~/utils/helper/formatting';
import { CommentContext } from './context';

interface CommentContentProps {
  commentId: number;
  content: string;
  createdAt: string;
}
const CommentContent = ({ commentId, content, createdAt }: CommentContentProps) => {
  const { onOpenPassword } = useContext(CommentContext);

  const handleDelete = () => {
    onOpenPassword(commentId, 'delete');
  };

  const handleEditStart = () => {
    onOpenPassword(commentId, 'edit');
  };

  return (
    <>
      <Content>
        <p>{content}</p>
      </Content>
      <Info>
        <CreatedAt>{formatDate(createdAt)}</CreatedAt>
        <Icon.Button name="Pencil" color="mediumGray" size="25" onClick={handleEditStart} />
        <Icon.Button name="Close" color="mediumGray" size="12" onClick={handleDelete} />
      </Info>
    </>
  );
};

export default CommentContent;

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
