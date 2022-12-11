import styled from '@emotion/styled';
import { useRef } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import useForm from '~/hooks/useForm';
import { useAddComment } from '~/react-query/hooks/useComment';
import { useUser } from '~/react-query/hooks/useUser';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { SUBMIT_CHECK } from '~/utils/helper/validation';
import CommentTextArea from './CommentTextArea';

const initialValues = {
  nickname: '',
  password: '',
  content: '',
};

export type commentValuesType = {
  [key in keyof typeof initialValues]: string;
};

const AddCommentForm = ({ questionId }: { questionId: number }) => {
  const { values, handleChange, handleSubmit, handleReset } = useForm({
    initialValues,
    onSubmit,
  });

  const { user } = useUser();
  const { addComment, isLoading } = useAddComment(questionId);

  const nicknameRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const contentRef = useRef<null | HTMLTextAreaElement>(null);

  async function onSubmit() {
    if (!user) {
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
    }

    if (SUBMIT_CHECK.comment.isValid(values.content)) {
      alert(SUBMIT_CHECK.comment.message);
      contentRef.current?.focus();
      return;
    }

    const commentData = user ? { content: values.content } : values;
    await addComment(commentData);

    // 위 에러 시 아래 코드 실행 안됨
    handleReset({ ...values, content: '' });
  }

  return (
    <Container>
      <Content>
        {!user && (
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
        )}
        <CommentTextArea value={values.content} ref={contentRef} onChange={handleChange} />
      </Content>
      <AddButton size="sm" onClick={handleSubmit} loading={isLoading}>
        등록
      </AddButton>
    </Container>
  );
};

export default AddCommentForm;

const Container = styled.form`
  background-color: ${({ theme }) => theme.colors.gray100};
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

  ${mediaQuery('sm')} {
    flex-direction: row;
    max-width: 320px;
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  box-sizing: border-box;

  &:first-of-type {
    margin-bottom: 10px;
  }

  ${mediaQuery('sm')} {
    width: 50%;

    &:first-of-type {
      margin-right: 10px;
    }
  }
`;

const Content = styled.div`
  display: flex;

  ${mediaQuery('sm')} {
    flex-direction: column;
  }
`;

const AddButton = styled(Button)`
  align-self: flex-end;
  width: 80px;
  margin-top: 10px;
`;
