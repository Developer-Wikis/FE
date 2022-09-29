import styled from '@emotion/styled';

interface InputProps {}

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 14px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;
