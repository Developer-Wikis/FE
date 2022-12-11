import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Input from '~/components/base/Input';
import { CheckPassword, DeleteComment } from '~/react-query/hooks/useComment';
import { CommentContext } from './context';

interface PasswordConfirmProps {
  commentId: number;
  deleteComment: DeleteComment;
  checkPassword: CheckPassword;
}

const PasswordConfirm = ({ commentId, deleteComment, checkPassword }: PasswordConfirmProps) => {
  const [password, setPassword] = useState('');

  const { passwordState, updatePasswordState, openEditor, closePassword } =
    useContext(CommentContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordState.action === 'delete') {
      deleteComment.mutateAsync({ commentId, password });
      closePassword();
      return;
    }

    if (passwordState.action === 'edit') {
      const isCorrectPassword = await checkPassword.mutateAsync({ commentId, password });

      if (isCorrectPassword.data) {
        openEditor(commentId);
        updatePasswordState({ commentId: null, action: 'edit', password });
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleClose = () => {
    closePassword();
  };

  return (
    <Container>
      <PasswordForm onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handleChange}
        />
        <SubmitButton size="sm" loading={deleteComment.isLoading || checkPassword.isLoading}>
          확인
        </SubmitButton>
        <Icon.Button name="Close" color="gray500" size="12" onClick={handleClose} />
      </PasswordForm>
    </Container>
  );
};

export default PasswordConfirm;

const Container = styled.div`
  position: absolute;
  background-color: white;
  right: 0;
  top: -2px;
  padding: 10px 15px 10px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  ${({ theme }) => theme.fontStyle.body2};
  box-shadow: 0px 0px 4px 1px rgb(0 0 0 / 5%);
`;

const PasswordForm = styled.form`
  display: flex;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  margin: 0 12px;
`;
