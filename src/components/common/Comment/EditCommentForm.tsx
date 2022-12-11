import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import { EditComment } from '~/react-query/hooks/useComment';
import { IUser } from '~/types/user';
import { Nullable } from '~/types/utilityType';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import CommentTextArea from './CommentTextArea';
import { CommentContext } from './context';

interface EditCommentFormProps {
  defaultValue: string;
  commentId: number;
  editComment: EditComment;
  user: Nullable<IUser>;
}

const EditCommentForm = ({ user, defaultValue, commentId, editComment }: EditCommentFormProps) => {
  const [content, setContent] = useState(defaultValue);
  const contentRef = useRef<Nullable<HTMLTextAreaElement>>(null);

  const { passwordState, closeEditor } = useContext(CommentContext);

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
      await editComment.mutateAsync({ commentId, payload: { content } });
    } else {
      await editComment.mutateAsync({
        commentId,
        payload: { password: passwordState.password, content },
      });
    }

    closeEditor();
  };

  return (
    <Container>
      <CommentTextArea value={content} ref={contentRef} onChange={handleChange} />
      <Buttons>
        <Button size="sm" onClick={closeEditor}>
          취소
        </Button>
        <Button size="sm" onClick={handleSubmit} loading={editComment.isLoading}>
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
