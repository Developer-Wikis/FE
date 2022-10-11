import styled from '@emotion/styled';
import { SubWithAllType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';

interface MiddleCategoryProps {
  subCategories: SubWithAllType[];
  onSelect: (category: SubWithAllType) => void;
  currentCategory: SubWithAllType;
}

const MiddleCategory = ({ subCategories, onSelect, currentCategory }: MiddleCategoryProps) => {
  return (
    <CategoryList>
      {subCategories.map((subCode) => (
        <li key={subCode} className={subCode === currentCategory ? 'selected' : ''}>
          <button onClick={() => onSelect(subCode)}>{convertSubCategory(subCode)}</button>
        </li>
      ))}
    </CategoryList>
  );
};

export default MiddleCategory;

const CategoryList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  li {
    margin-right: 14px;
    margin-top: 12px;

    button {
      font-size: 16px;
      padding: 8px 14px;
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.darkGray};
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.blackGray};
      }
    }

    &.selected button {
      color: ${({ theme }) => theme.colors.blackGray};
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.bgGray};
    }
  }
`;
