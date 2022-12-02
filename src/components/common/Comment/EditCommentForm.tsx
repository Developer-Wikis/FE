import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import { useEditComment } from '~/react-query/hooks/useComment';
import { useUser } from '~/react-query/hooks/useUser';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import CommentTextArea from './CommentTextArea';
import { CommentContext } from './context';

interface EditCommentFormProps {
  defaultValue: string;
  commentId: number;
}

const EditCommentForm = ({ defaultValue, commentId }: EditCommentFormProps) => {
  const [content, setContent] = useState(defaultValue);
  const contentRef = useRef<null | HTMLTextAreaElement>(null);
  const { onCancelEdit, passwordState, questionId } = useContext(CommentContext);
  const { user } = useUser();
  const { editComment, isLoading } = useEditComment(questionId);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (SUBMIT_CHECK.comment.isValid(content)) {
      alert(SUBMIT_CHECK.comment.message);
      contentRef.current?.focus();
      return;
    }

    if (user) {
      await editComment({ commentId, payload: { content } });
    } else {
      await editComment({ commentId, payload: { password: passwordState.password, content } });
    }

    // 위 에러 시 아래 코드 실행 안됨
    onCancelEdit();
  };

  return (
    <Container>
      <CommentTextArea value={content} ref={contentRef} onChange={handleChange} />
      <Buttons>
        <Button size="sm" onClick={onCancelEdit}>
          취소
        </Button>
        <Button size="sm" onClick={handleSubmit} loading={isLoading}>
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

  button {
    width: 80px;
    margin-left: 10px;
  }
`;
