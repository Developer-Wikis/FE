import styled from '@emotion/styled';

interface PageInfo {
  cur: number;
  total: number;
}

const PageInfo = ({ cur, total }: PageInfo) => {
  if (total <= 0) return null;

  return (
    <StyledSpan>
      {cur + 1}/{total} 페이지
    </StyledSpan>
  );
};

export default PageInfo;

const StyledSpan = styled.span`
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray500};
  white-space: nowrap;
`;
