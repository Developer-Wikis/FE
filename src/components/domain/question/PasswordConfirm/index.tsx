import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Input from '~/components/base/Input';

interface PasswordConfirmProps {
  handleSubmitPassword: (password: string) => void;
  handleClose: () => void;
}
const PasswordConfirm = ({ handleSubmitPassword, handleClose }: PasswordConfirmProps) => {
  const [password, setPassword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitPassword(password);
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
        <Button size="sm">확인</Button>
        <Icon.Button name="Close" color="mediumGray" size="12" onClick={handleClose} />
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
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0px 0px 4px 1px rgb(0 0 0 / 5%);
`;

const PasswordForm = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;
`;
