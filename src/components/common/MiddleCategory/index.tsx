import styled from '@emotion/styled';

interface MiddleCategoryProps {
  categories: string[];
  onSelect: (value: string) => void;
  currentCategory: string;
}

const MiddleCategory = ({ categories, onSelect, currentCategory }: MiddleCategoryProps) => {
  return (
    <CategoryList>
      {categories.map((category) => (
        <li key={category} className={category === currentCategory ? 'selected' : ''}>
          <button onClick={() => onSelect(category)}>{category}</button>
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
      font-size: 14px;
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
