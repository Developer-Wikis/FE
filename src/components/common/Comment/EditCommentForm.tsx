import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import CommentTextArea from '../CommentTextArea';
import { CommentContext } from './context';

interface EditCommentFormProps {
  defaultValue: string;
  commentId: number;
}

const EditCommentForm = ({ defaultValue, commentId }: EditCommentFormProps) => {
  const [content, setContent] = useState(defaultValue);
  const contentRef = useRef<null | HTMLTextAreaElement>(null);
  const { onEditComment, onCancelEdit } = useContext(CommentContext);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (SUBMIT_CHECK.comment.isValid(content)) {
      alert(SUBMIT_CHECK.comment.message);
      contentRef.current?.focus();
      return;
    }

    onEditComment(commentId, content);
  };

  return (
    <Container>
      <CommentTextArea value={content} ref={contentRef} onChange={handleChange} />
      <Buttons>
        <Button size="sm" onClick={onCancelEdit}>
          취소
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          수정
        </Button>
      </Buttons>
    </Container>
  );
};

export default EditCommentForm;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    width: 80px;
  }
`;
