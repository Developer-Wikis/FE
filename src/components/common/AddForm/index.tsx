import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '~/components/base/Button';
import Input from '~/components/base/Input';

interface AddFormProps {
  name: string;
  id: string;
  buttonText: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
  isValid?: (text: string) => boolean;
  defaultValue?: string;
  reset?: boolean;
}

const AddForm = ({
  buttonText,
  onSubmit,
  placeholder,
  isValid,
  defaultValue,
  reset = true,
  ...props
}: AddFormProps) => {
  const [text, setText] = useState(defaultValue ? defaultValue : '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validText = text.trim();
    setText(validText);

    if (isValid && !isValid(validText)) {
      return;
    }

    onSubmit(validText);

    if (reset) {
      setText('');
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        value={text}
        placeholder={placeholder}
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
