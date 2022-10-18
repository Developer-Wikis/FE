import { ChangeEvent } from 'react';
import Input from '~/components/base/Input';
import Label from '~/components/base/Label';
import InputField from '.';
import ErrorMessage from '../ErrorMessage';

interface TitleFieldProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  message?: string;
}

const TitleField = ({ handleChange, message }: TitleFieldProps) => {
  return (
    <InputField>
      <Label htmlFor="title">제목</Label>
      <Input
        type="text"
        name="title"
        id="title"
        placeholder="질문 제목을 입력해 주세요."
        onChange={handleChange}
      />
      {message && <ErrorMessage message={message} />}
    </InputField>
  );
};

export default TitleField;
