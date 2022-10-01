import styled from '@emotion/styled';
import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from 'react';
import { buttonStyle } from './types';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof buttonStyle;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

const Button = ({ buttonType, disabled, children, ...props }: ButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} disabled={disabled} {...props}>
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

  ${({ buttonType }) => buttonType && buttonStyle[buttonType]};

  &:disabled {
    opacity: 0.7;
  }
`;
