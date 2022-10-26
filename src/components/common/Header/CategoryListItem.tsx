import Link from '~/components/base/Link';
import styled from '@emotion/styled';

interface CategoryListItemProps {
  href: string;
  name: string;
  select: boolean;
  shallow?: boolean;
}

const CategoryListItem = ({ href, name, select, shallow = false }: CategoryListItemProps) => {
  return (
    <StyledLi className={select ? 'selected' : ''}>
      <Link href={href} shallow={shallow}>
        {name}
      </Link>
    </StyledLi>
  );
};

export default CategoryListItem;

const StyledLi = styled.li`
  & ~ li {
    margin-left: 22px;
  }

  a {
    ${({ theme }) => theme.fontStyle.subtitle1};
  }

  &.selected a {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 600;
  }
`;
