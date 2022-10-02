import styled from '@emotion/styled';
import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from 'react';
import { buttonSizes, buttonStyle } from './types';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof buttonStyle;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  size?: keyof typeof buttonSizes;
}

const Button = ({
  buttonType = 'black',
  disabled,
  children,
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} disabled={disabled} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  border-radius: 4px;
  white-space: nowrap;

  ${({ buttonType }) => buttonType && buttonStyle[buttonType]};
  ${({ size }) => size && buttonSizes[size]};

  &:disabled {
    opacity: 0.7;
  }
`;
