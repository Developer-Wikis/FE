import styled from '@emotion/styled';
import { useContext } from 'react';
import Icon from '~/components/base/Icon';
import { formatDate } from '~/utils/helper/formatting';
import { mediaQuery } from '~/utils/helper/mediaQuery';
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
        <Buttons>
          <Icon.Button name="Pencil" color="gray500" size="25" onClick={handleEditStart} />
          <Icon.Button name="Close" color="gray500" size="12" onClick={handleDelete} />
        </Buttons>
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
  color: ${({ theme }) => theme.colors.gray500};
  align-self: flex-start;
`;

const CreatedAt = styled.span`
  ${({ theme }) => theme.fontStyle.body2};

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
