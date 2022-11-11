import styled from '@emotion/styled';
import { SubWithAllType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';
import { mediaQuery } from '~/utils/helper/mediaQuery';

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
      ${({ theme }) => theme.fontStyle.body1};
      padding: 8px 14px;
      border-radius: 4px;
      color: ${({ theme }) => theme.colors.gray600};
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.gray800};
      }
    }

    &.selected button {
      color: ${({ theme }) => theme.colors.gray800};
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.gray200};
    }
  }

  ${mediaQuery('sm')} {
    flex-wrap: nowrap;
    justify-content: start;
    overflow-x: scroll;
    padding: 8px 0 4px;

    li {
      flex-shrink: 0;
      margin-top: 0;
    }
  }
`;
