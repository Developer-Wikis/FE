import styled from '@emotion/styled';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';
import CommentProvider from './context';
import TotalCount from './TotalCount';

interface CommentProps {
  questionId: number;
}

const Comment = ({ questionId }: CommentProps) => {
  return (
    <Container>
      <CommentProvider questionId={questionId}>
        <TotalCount />
        <CommentContent>
          <CommentList />
          <AddCommentForm />
        </CommentContent>
      </CommentProvider>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin-top: 38px;
`;

const CommentContent = styled.div`
  margin-top: 18px;
  border-top: 2px solid ${({ theme }) => theme.colors.gray800};
  align-items: center;
`;
