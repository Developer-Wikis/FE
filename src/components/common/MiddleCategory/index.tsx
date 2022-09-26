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
        <li
          key={category}
          className={category === currentCategory ? 'selected' : ''}
          onClick={() => onSelect(category)}
        >
          {category}
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
    margin-right: 22px;
    margin-top: 12px;

    padding: 12px;
    border-radius: 4px;

    &.selected {
      background-color: ${({ theme }) => theme.colors.bgGray};
    }
  }
`;
