import styled from '@emotion/styled';

const Label = styled.label`
  display: block;
  ${({ theme }) => theme.fontStyle.body2};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 12px;
`;

export default Label;
