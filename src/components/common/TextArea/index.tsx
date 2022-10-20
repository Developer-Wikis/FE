import styled from '@emotion/styled';
import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: number;
  block?: boolean;
}

const TextArea = ({ height = 74, block = false, ...props }: TextAreaProps) => {
  return <StyledTextArea height={height} block={block} {...props} />;
};

export default TextArea;

const StyledTextArea = styled.textarea<TextAreaProps>`
  background-color: white;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  ${({ theme }) => theme.fontStyle.body2};
  display: ${({ block }) => (block ? 'block' : 'inline-block')};

  height: ${({ height }) => height && height + 'px'};
  padding: 8px;
  box-sizing: border-box;
  resize: none;
`;
