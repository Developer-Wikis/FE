import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import Label from '~/components/base/Label';
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
    <StyledInputField>
      <Label htmlFor="subCategories">분류 선택</Label>

      {mainCategory === 'none' && <Notice>직무를 선택해 주세요.</Notice>}
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
    </StyledInputField>
  );
};

export default SubCategoryField;

const MARGIN_BOTTOM = '6px';

const StyledInputField = styled(InputField)`
  margin-bottom: calc(42px - ${MARGIN_BOTTOM});
`;

const Notice = styled.div`
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray600};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  label {
    margin-right: 6px;
    margin-bottom: ${MARGIN_BOTTOM};
  }
`;
