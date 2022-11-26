import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  required?: boolean;
  checked: boolean;
  onChange: () => void;
  /**
   * Checkbox의 내용이 들어갑니다.
   */
  children: ReactNode;
}
const Checkbox = ({
  id,
  name,
  required = false,
  checked,
  onChange,
  children,
  ...props
}: CheckboxProps) => {
  return (
    <Container {...props}>
      <input
        type="checkbox"
        name={name}
        id={id}
        required={required}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </Container>
  );
};

export default Checkbox;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    margin: 0;
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.red};
  }

  label {
    margin-left: 6px;
    ${({ theme }) => theme.fontStyle.body2}
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
