import styled from '@emotion/styled';
import { ICommentItem } from '~/types/comment';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

interface CommentProps {
  total: number;
  comments: ICommentItem[];
}

const Comment = ({ total, comments }: CommentProps) => {
  return (
    <Container>
      <TotalCount>댓글 {total}</TotalCount>
      <CommentContent>
        {comments.map((comment) => (
          <CommentList key={comment.id} comment={comment} />
        ))}
        <AddCommentForm />
      </CommentContent>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin-top: 38px;
`;

const TotalCount = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CommentContent = styled.div`
  margin-top: 18px;
  border-top: 2px solid ${({ theme }) => theme.colors.blackGray};
  align-items: center;
`;
