import styled from '@emotion/styled';
import { ICommentItem } from '~/types/comment';

interface CommentListProps {
  comment: ICommentItem;
}

const CommentList = ({ comment }: CommentListProps) => {
  const onDelete = () => {};

  return (
    <StyledLi>
      <Writer>
        <span>{comment.nickname}</span>
      </Writer>
      <Content>
        <span>{comment.content}</span>
      </Content>
      <Info>
        <span>{comment.createdAt}</span>
        <button onClick={onDelete}>삭제</button>
      </Info>
    </StyledLi>
  );
};

export default CommentList;

const StyledLi = styled.li`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const Writer = styled.div`
  margin-left: 16px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.darkGray};
`;
const Content = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 16px;
`;

const Info = styled.div`
  text-align: right;
  margin-left: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.mediumGray};
`;
