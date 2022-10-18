import styled from '@emotion/styled';

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.fontStyle.body2};
  text-align: center;
  margin-top: 14px;
`;

export default PageDescription;
