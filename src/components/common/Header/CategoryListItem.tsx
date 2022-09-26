import Link from '~/components/base/Link';
import styled from '@emotion/styled';

interface CategoryListItemProps {
  href: string;
  name: string;
}

const CategoryListItem = ({ href, name }: CategoryListItemProps) => {
  return (
    <Li>
      <Link href={href}>{name}</Link>
    </Li>
  );
};

export default CategoryListItem;

const Li = styled.li`
  margin-right: 16px;
  a {
    font-size: 16px;
  }
`;
