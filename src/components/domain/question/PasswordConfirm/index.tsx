import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Input from '~/components/base/Input';

interface PasswordConfirmProps {
  handlePasswordSubmit: (password: string) => void;
  handleClose: () => void;
}
const PasswordConfirm = ({ handlePasswordSubmit, handleClose }: PasswordConfirmProps) => {
  const [password, setPassword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handlePasswordSubmit(password);
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
        <button onClick={handleClose}>
          <Icon name="Close" color="mediumGray" size="12" />
        </button>
      </PasswordForm>
    </Container>
  );
};

export default PasswordConfirm;

const Container = styled.div`
  position: absolute;
  background-color: white;
  right: 0;
  top: -55px;
  padding: 8px;
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
