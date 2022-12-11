import styled from '@emotion/styled';

const TotalCount = ({ total }: { total: number }) => {
  return <StyledSpan>댓글 {total}</StyledSpan>;
};

export default TotalCount;

const StyledSpan = styled.span`
  ${({ theme }) => theme.fontStyle.subtitle1};
`;
