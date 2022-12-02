import styled from '@emotion/styled';
import { useComment } from '~/react-query/hooks/useComment';
import CommentItem from './CommentItem';
import TotalCount from './TotalCount';

const CommentList = ({ questionId }: { questionId: number }) => {
  const { comments } = useComment(questionId);
  return (
    <>
      <TotalCount total={comments.length} />
      <StyledUl>
        {comments.map((comment) => (
          <CommentItem key={comment.id} commentId={comment.id} comment={comment} />
        ))}
      </StyledUl>
    </>
  );
};

export default CommentList;

const StyledUl = styled.ul`
  border-top: 2px solid ${({ theme }) => theme.colors.gray800};
  margin-top: 18px;
`;
