import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import Select from '~/components/base/select';
import { MAIN_CATEGORIES } from '~/utils/constant/category';
import { convertMainCategory } from '~/utils/helper/converter';

interface MainCategoryFieldProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
}

const MainCategoryField = ({ handleChange, selected }: MainCategoryFieldProps) => {
  return (
    <div>
      <Label htmlFor="mainCategory">직무 선택</Label>
      <Select
        list={MAIN_CATEGORIES.map((mainCode) => ({
          value: mainCode,
          text: convertMainCategory(mainCode),
        }))}
        name="mainCategory"
        style={{ width: '383px' }}
        onChange={handleChange}
        selected={selected}
      />
    </div>
  );
};

export default MainCategoryField;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 12px;
`;
