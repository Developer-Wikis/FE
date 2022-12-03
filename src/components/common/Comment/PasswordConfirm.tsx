import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Input from '~/components/base/Input';
import useCommentHandler from '~/hooks/useCommentHandler';

interface PasswordConfirmProps {
  commentId: number;
}

const PasswordConfirm = ({ commentId }: PasswordConfirmProps) => {
  const [password, setPassword] = useState('');

  const { onSubmitPassword, onClosePassword, isLoadingDelete, isLoadingCheckPassword } =
    useCommentHandler();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitPassword({ commentId, password });
  };

  const handleClose = () => {
    onClosePassword();
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
        <SubmitButton size="sm" loading={isLoadingDelete || isLoadingCheckPassword}>
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
