import styled from '@emotion/styled';
import { theme } from '~/types/theme';

const spinnerSize = {
  sm: `
    width: 1.5em;
    height: 1.5em;
  `,
  md: `
    width: 50px;
    height: 50px;
  `,
} as const;

const spinnerColor = {
  white: theme.colors.white,
  gray: theme.colors.gray400,
} as const;

interface SpinnerProps {
  /**
   * Spinner의 색상을 설정합니다.
   */
  color?: keyof typeof spinnerColor;
  /**
   * Spinner의 사이즈를 설정합니다.
   */
  size?: keyof typeof spinnerSize;
}

/**
  부모 컴포넌트에 width, height, position: relative 속성이 있어야 정상적으로 나타납니다.
 */
const Spinner = ({ color = 'white', size = 'sm' }: SpinnerProps) => {
  return (
    <SpinnerContainer color={color} size={size}>
      <div className="loader"></div>
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div<SpinnerProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  .loader,
  .loader:after {
    border-radius: 50%;
    ${({ size }) => size && spinnerSize[size]};
  }

  .loader {
    position: relative;

    border-width: ${({ size }) => (size === 'md' ? '3px' : '2px')};
    border-style: solid;
    border-color: ${({ color }) =>
      color === 'white' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(125, 125, 125, 0.1)'};
    border-left-color: ${({ color }) => color};

    animation: loading 1.1s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
