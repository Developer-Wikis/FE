import styled from '@emotion/styled';
import {
  useCheckPassword,
  useDeleteComment,
  useEditComment,
  useGetComment,
} from '~/react-query/hooks/useComment';
import { useUser } from '~/react-query/hooks/useUser';
import CommentItem from './CommentItem';
import TotalCount from './TotalCount';

const CommentList = ({ questionId }: { questionId: number }) => {
  const { comments } = useGetComment(questionId);
  const deleteComment = useDeleteComment(questionId);
  const editComment = useEditComment(questionId);
  const checkPassword = useCheckPassword(questionId);
  const { user } = useUser();

  return (
    <>
      <TotalCount total={comments.length} />
      <StyledUl>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            editComment={editComment}
            checkPassword={checkPassword}
            user={user}
          />
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
