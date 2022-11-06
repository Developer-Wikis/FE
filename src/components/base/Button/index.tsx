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
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = ({
  buttonType = 'black',
  disabled,
  children,
  size = 'md',
  loading,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton buttonType={buttonType} disabled={disabled || loading} size={size} {...props}>
      {startIcon && <StartIcon>{startIcon}</StartIcon>}
      {loading && <Spinner />}
      <Content className={loading ? 'hidden' : ''}>{children}</Content>
      {endIcon && <EndIcon>{endIcon}</EndIcon>}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
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
  line-height: inherit;

  &.hidden {
    visibility: hidden;
  }
`;

const StartIcon = styled.span`
  margin-left: -3px;
  margin-right: 6px;
`;

const EndIcon = styled.span`
  margin-right: -3px;
  margin-left: 6px;
`;
