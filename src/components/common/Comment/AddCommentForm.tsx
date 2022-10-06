import styled from '@emotion/styled';
import { useContext, useRef } from 'react';
import Button from '~/components/base/Button';
import useForm from '~/hooks/useForm';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import CommentTextArea from '../CommentTextArea';
import { CommentContext } from './context';

const initialValues = {
  nickname: '',
  password: '',
  content: '',
};

export type commentValuesType = {
  [key in keyof typeof initialValues]: string;
};

const AddCommentForm = () => {
  const { values, handleChange, handleSubmit, handleReset } = useForm({
    initialValues,
    onSubmit,
  });

  const { onAddComment } = useContext(CommentContext);

  const nicknameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const contentRef = useRef<null | HTMLTextAreaElement>(null);

  async function onSubmit() {
    if (SUBMIT_CHECK.nickname.isValid(values.nickname)) {
      alert(SUBMIT_CHECK.nickname.message);
      nicknameRef.current?.focus();
      return;
    }
    if (SUBMIT_CHECK.password.isValid(values.password)) {
      alert(SUBMIT_CHECK.password.message);
      passwordRef.current?.focus();
      return;
    }

    if (SUBMIT_CHECK.comment.isValid(values.content)) {
      alert(SUBMIT_CHECK.comment.message);
      contentRef.current?.focus();
      return;
    }

    await onAddComment(values);
    handleReset({ ...values, content: '' });
  }

  return (
    <Container>
      <Content>
        <Writer>
          <Input
            name="nickname"
            ref={nicknameRef}
            placeholder="닉네임"
            value={values.nickname}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            ref={passwordRef}
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
        </Writer>
        <CommentTextArea value={values.content} ref={contentRef} onChange={handleChange} />
      </Content>
      <AddButton size="sm" onClick={handleSubmit}>
        등록
      </AddButton>
    </Container>
  );
};

export default AddCommentForm;

const Container = styled.form`
  background-color: ${({ theme }) => theme.colors.bgLightGray};
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 20px;
`;

const Writer = styled.div`
  display: flex;
  flex-direction: column;
  width: 132px;
  margin-right: 10px;
`;

const Input = styled.input`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 14px;

  height: 32px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
`;

const AddButton = styled(Button)`
  align-self: flex-end;
  width: 80px;
`;
