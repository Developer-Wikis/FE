import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, Ref } from 'react';

export const inputSize = {
  sm: `
    padding: 5px 8px;
    height: 32px;
  `,
  md: `
    padding: 8px 10px;
  `,
};

type SizeType = 'sm' | 'md';
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input의 사이즈를 설정합니다.
   */
  size?: SizeType;
}

const Input = forwardRef(({ size = 'md', ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
  return <StyledInput ref={ref} sizeType={size} {...props} />;
});

export default Input;

const StyledInput = styled.input<{ sizeType: SizeType }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  ${({ sizeType }) => sizeType && inputSize[sizeType]};
  ${({ theme }) => theme.fontStyle.body2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.gray800};
    outline-width: 1px;
    outline-style: solid;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
