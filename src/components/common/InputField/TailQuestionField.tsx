import Label from '~/components/base/Label';
import TailQuestionList from '~/components/domain/question/TailQuestionList';
import { isValidTailQuestion } from '~/utils/helper/validation';
import InputField from '.';
import AddForm from '../AddForm';

interface TailQuestionFieldProps {
  handleSubmit: (value: string) => void;
  list: string[];
  onRemove: (index: number) => void;
}

const TailQuestionField = ({ handleSubmit, list, onRemove }: TailQuestionFieldProps) => {
  return (
    <InputField>
      <Label htmlFor="tailQuestion">꼬리질문</Label>
      <AddForm
        buttonText="추가"
        name="tailQuestion"
        id="tailQuestion"
        onSubmit={handleSubmit}
        placeholder="예상되는 꼬리질문을 입력해주세요."
        isValid={isValidTailQuestion}
      />
      <TailQuestionList list={list} onRemove={onRemove} />
    </InputField>
  );
};

export default TailQuestionField;
