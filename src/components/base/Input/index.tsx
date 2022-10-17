import styled from '@emotion/styled';

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 8px 10px;
  width: 100%;
  ${({ theme }) => theme.fontStyle.body2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export default Input;
