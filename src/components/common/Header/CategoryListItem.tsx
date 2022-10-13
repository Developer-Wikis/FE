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
    <Li className={select ? 'selected' : ''}>
      <Link href={href} shallow={shallow}>
        {name}
      </Link>
    </Li>
  );
};

export default CategoryListItem;

const Li = styled.li`
  margin-right: 16px;

  a {
    font-size: 18px;
  }

  &.selected a {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 600;
  }
`;
