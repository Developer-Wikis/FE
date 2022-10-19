import Label from '~/components/base/Label';
import TailQuestionList from '~/components/domain/question/TailQuestionList';
import InputField from '.';
import AddTailQuestionForm from '../AddTailQuestionForm';

interface TailQuestionFieldProps {
  handleSubmit: (value: string) => void;
  list: string[];
  onRemove: (index: number) => void;
}

const TailQuestionField = ({ handleSubmit, list, onRemove }: TailQuestionFieldProps) => {
  return (
    <InputField>
      <Label htmlFor="tailQuestion">꼬리질문</Label>
      <AddTailQuestionForm
        type="text"
        buttonText="추가"
        name="tailQuestion"
        id="tailQuestion"
        onSubmit={handleSubmit}
      />
      <TailQuestionList list={list} onRemove={onRemove} />
    </InputField>
  );
};

export default TailQuestionField;
