import styled from '@emotion/styled';
import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from 'react';
import Spinner from '~/components/common/Spinner/inext';
import { buttonSizes, buttonStyle } from './types';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof buttonStyle;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  size?: keyof typeof buttonSizes;
  loading?: boolean;
}

const Button = ({
  buttonType = 'black',
  disabled,
  children,
  size = 'md',
  loading,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} disabled={disabled || loading} size={size} {...props}>
      {loading && <Spinner />}
      <Content className={loading ? 'hidden' : ''}>{children}</Content>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  white-space: nowrap;

  ${({ buttonType }) => buttonType && buttonStyle[buttonType]};
  ${({ size }) => size && buttonSizes[size]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Content = styled.span`
  &.hidden {
    visibility: hidden;
  }
`;
