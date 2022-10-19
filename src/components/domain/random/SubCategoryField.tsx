import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import InputField from '~/components/common/InputField';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';

import SubCategoryCheckbox from './SubCategoryCheckbox';

interface SubCategoryFieldProps {
  mainCategory: MainType | 'none';
  subCategories: SubWithAllType[];
  handleChange: (name: string, value: SubWithAllType[]) => void;
}

const SubCategoryField = ({ mainCategory, subCategories, handleChange }: SubCategoryFieldProps) => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    let nextSubCategories: SubWithAllType[] = [];

    if (id === 'all' && checked) {
      nextSubCategories = ['all'];
    } else {
      nextSubCategories = checked
        ? subCategories.filter((subCode) => subCode !== 'all').concat(id as SubWithAllType)
        : subCategories.filter((subCode) => subCode !== id);
    }

    handleChange('subCategories', nextSubCategories);
  };

  return (
    <InputField>
      <Label htmlFor="subCategories">분류 선택</Label>

      {mainCategory === 'none' && <Notice>직무를 선택해주세요</Notice>}
      {mainCategory !== 'none' && (
        <Container>
          <SubCategoryCheckbox
            value="all"
            handleChange={handleSelect}
            checked={subCategories.includes('all')}
          />

          {SUB_CATEGORIES[mainCategory].map((subCode) => (
            <SubCategoryCheckbox
              value={subCode}
              key={subCode}
              handleChange={handleSelect}
              checked={subCategories.includes(subCode)}
            />
          ))}
        </Container>
      )}
    </InputField>
  );
};

export default SubCategoryField;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
  margin-bottom: 12px;
`;

const Notice = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
