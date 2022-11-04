import styled from '@emotion/styled';
import PageTitle from '~/components/base/PageTitle';
import { SubType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';

interface PostHeaderProps {
  subCategory: SubType;
  title: string;
}

const PostHeader = ({ subCategory, title }: PostHeaderProps) => {
  return (
    <Container>
      <CategoryName>{convertSubCategory(subCategory)}</CategoryName>
      <PostTitle>{title}</PostTitle>
    </Container>
  );
};

export default PostHeader;

const Container = styled.div`
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  padding-bottom: 22px;
`;
const CategoryName = styled.div`
  ${({ theme }) => theme.fontStyle.body2};
  color: ${({ theme }) => theme.colors.gray500};
`;

const PostTitle = styled(PageTitle)`
  margin-top: 18px;
`;
