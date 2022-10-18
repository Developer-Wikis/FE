import styled from '@emotion/styled';
import { useContext } from 'react';
import { CommentContext, ContextTypes } from './context';

const TotalCount = () => {
  const { comments } = useContext(CommentContext);

  return <StyledSpan>댓글 {comments.length}</StyledSpan>;
};

export default TotalCount;

const StyledSpan = styled.span`
  ${({ theme }) => theme.fontStyle.subtitle1};
`;
