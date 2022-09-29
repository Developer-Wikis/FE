import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';

interface AddFormProps {
  type: string;
  name: string;
  id: string;
  buttonText: string;
  onSubmit: (value: string) => void;
}

const AddForm = ({ buttonText, onSubmit, ...props }: AddFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 1) {
      alert('내용을 입력해 주세요.');
      return;
    }

    onSubmit(text);
    setText('');
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        {...props}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <Button onClick={handleSubmit}>{buttonText}</Button>
    </Container>
  );
};

export default AddForm;

const Container = styled.form`
  display: flex;
  input {
    width: 100%;
  }

  button {
    margin-left: 12px;
  }
`;
