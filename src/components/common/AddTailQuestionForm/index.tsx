import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';
import { checkLength, SUBMIT_CHECK } from '~/utils/helper/validation';

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

    if (SUBMIT_CHECK.tailQuestion.isValid(text)) {
      alert(SUBMIT_CHECK.tailQuestion.message);
      return;
    }

    onSubmit(validText);
    setText('');
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        value={text}
        placeholder="예상되는 꼬리 질문을 작성해 주세요."
        {...props}
      />
      <Button size="sm" onClick={handleSubmit}>
        {buttonText}
      </Button>
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
    width: 80px;
  }
`;