import styled from '@emotion/styled';
import { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from 'react';
import Spinner from '~/components/common/Spinner';
import { buttonSizes, buttonStyle } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button의 내용이 들어갑니다.
   */
  children?: ReactNode;
  /**
   * Button의 ColorType을 설정합니다.
   */
  variant?: keyof typeof buttonStyle;
  /**
   * Button의 size를 설정합니다.
   */
  size?: keyof typeof buttonSizes;
  /**
   * true일 경우 좌우 공간을 모두 차지합니다.
   */
  fullWidth?: boolean;
  /**
   * true일 경우 button이 disabled 됩니다.
   */
  disabled?: boolean;
  /**
   * true일 경우 로딩 스피너가 나타납니다.
   */
  loading?: boolean;
  /**
   * Button의 앞부분에 요소를 추가합니다.
   */
  startIcon?: ReactNode;
  /**
   * Button의 뒷부분에 요소를 추가합니다.
   */
  endIcon?: ReactNode;
}

const Button = ({
  children,
  variant = 'black',
  size = 'md',
  fullWidth,
  disabled,
  loading,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      isLoading={!!loading}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      size={size}
      {...props}
    >
      {startIcon && <StartIcon>{startIcon}</StartIcon>}
      {loading && <Spinner />}
      {children}
      {endIcon && <EndIcon>{endIcon}</EndIcon>}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps & { isLoading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;

  ${({ variant }) => variant && buttonStyle[variant]};
  ${({ size }) => size && buttonSizes[size]};
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
  ${({ isLoading }) => isLoading && `color: transparent;`}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
