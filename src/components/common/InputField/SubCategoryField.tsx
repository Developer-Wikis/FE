import { ChangeEvent } from 'react';
import Label from '~/components/base/Label';
import Select from '~/components/base/Select';
import { MainType, SubType, SUB_CATEGORIES } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';
import InputField from '.';
import ErrorMessage from '../ErrorMessage';

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
        list={SUB_CATEGORIES[mainCategory].map((subCode) => ({
          value: subCode,
          text: convertSubCategory(subCode),
        }))}
        name="subCategory"
        onChange={handleChange}
        value={selected}
      />
      {message && <ErrorMessage message={message} />}
    </InputField>
  );
};

export default SubCategoryField;
