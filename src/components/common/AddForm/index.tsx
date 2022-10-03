import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import { checkLength } from '~/utils/helper/validation';

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

    const validText = text.trim();
    setText(validText);

    if (checkLength(validText, 2, 30)) {
      alert('꼬리 질문은 2~30자로 입력해 주세요.');
      return;
    }

    onSubmit(validText);
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
