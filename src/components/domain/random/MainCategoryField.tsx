import { ChangeEvent } from 'react';
import Label from '~/components/base/Label';
import Select from '~/components/base/Select';
import ErrorMessage from '~/components/common/ErrorMessage';
import InputField from '~/components/common/InputField';
import { getMainCategorySelectList } from '~/utils/helper/categorySelect';

interface MainCategoryFieldProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
  message?: string;
}

const MainCategoryField = ({ handleChange, selected, message }: MainCategoryFieldProps) => {
  return (
    <InputField>
      <Label htmlFor="mainCategory">직무 선택</Label>
      <Select
        list={getMainCategorySelectList()}
        name="mainCategory"
        onChange={handleChange}
        selected={selected}
        defaultText="직무를 선택해 주세요."
      />
      {message && <ErrorMessage message={message} />}
    </InputField>
  );
};

export default MainCategoryField;
