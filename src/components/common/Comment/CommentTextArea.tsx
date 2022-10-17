import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, Ref } from 'react';

interface CommentTextAreaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
const CommentTextArea = forwardRef(
  ({ onChange, value }: CommentTextAreaProps, ref?: Ref<HTMLTextAreaElement>) => {
    return (
      <StyledTextArea
        name="content"
        placeholder="댓글을 입력해주세요"
        value={value}
        ref={ref}
        onChange={onChange}
      />
    );
  },
);

export default CommentTextArea;

const StyledTextArea = styled.textarea`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  ${({ theme }) => theme.fontStyle.body2};

  height: 74px;
  padding: 8px;
  box-sizing: border-box;
  resize: none;
  flex-grow: 1;
`;
