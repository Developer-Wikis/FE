import styled from '@emotion/styled';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
interface ButtonProps {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  style?: CSSProperties;
}

const Button = ({ type = 'button', onClick, disabled, children, ...props }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  font-size: 14px;
  padding: 12px 26px;
  background-color: ${({ theme }) => theme.colors.blackGray};
  color: white;
  border-radius: 4px;
  white-space: nowrap;

  &:disabled {
    opacity: 0.7;
  }
`;
