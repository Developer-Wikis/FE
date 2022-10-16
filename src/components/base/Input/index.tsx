import styled from '@emotion/styled';

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 14px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;

export default Input;
