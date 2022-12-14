import { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { SubWithAllType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';

interface SubCategoryCheckboxProps {
  value: SubWithAllType;
  checked?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SubCategoryCheckbox = ({ value, checked, handleChange }: SubCategoryCheckboxProps) => {
  return (
    <>
      <Checkbox type="checkbox" name={value} id={value} onChange={handleChange} checked={checked} />
      <Label htmlFor={value}>{convertSubCategory(value)}</Label>
    </>
  );
};

export default SubCategoryCheckbox;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + label {
    border-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
  }

  &:focus-visible&&:focus + label {
    outline: -webkit-focus-ring-color auto 1px;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 15px;
  padding: 5px 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: ${({ theme }) => theme.colors.white};
  user-select: none;
  cursor: pointer;
`;
