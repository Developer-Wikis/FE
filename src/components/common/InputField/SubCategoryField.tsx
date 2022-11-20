import { ChangeEvent } from 'react';
import Label from '~/components/base/Label';
import Select from '~/components/base/Select';
import { MainType, SubType } from '~/utils/constant/category';
import InputField from '.';
import ErrorMessage from '../ErrorMessage';
import { getSubCategorySelectList } from '~/utils/helper/categorySelect';

interface SubCategoryFieldProps {
  mainCategory: MainType;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selected: SubType | 'none';
  message: string;
}

const SubCategoryField = ({
  mainCategory,
  handleChange,
  selected,
  message,
}: SubCategoryFieldProps) => {
  return (
    <InputField>
      <Label htmlFor="subCategory">분류</Label>
      <Select
        list={getSubCategorySelectList(mainCategory)}
        name="subCategory"
        onChange={handleChange}
        value={selected}
        defaultText="분류를 선택해 주세요."
      />
      {message && <ErrorMessage message={message} />}
    </InputField>
  );
};

export default SubCategoryField;
