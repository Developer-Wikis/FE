import styled from '@emotion/styled';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';
import CommentProvider from './context';

interface CommentProps {
  questionId: number;
}

const Comment = ({ questionId }: CommentProps) => {
  return (
    <Container>
      <CommentContent>
        <CommentProvider questionId={questionId}>
          <CommentList questionId={questionId} />
        </CommentProvider>
      </CommentContent>
      <AddCommentForm questionId={questionId} />
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  margin-top: 38px;
`;

const CommentContent = styled.div`
  align-items: center;
`;
