import styled from '@emotion/styled';
import PageTitle from '~/components/base/PageTitle';
import { SubType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';

interface PostHeaderProps {
  subCategory: SubType;
  title: string;
  writer: string;
}

const PostHeader = ({ subCategory, title, writer }: PostHeaderProps) => {
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  padding-bottom: 22px;
`;
const CategoryName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const PostTitle = styled(PageTitle)`
  margin-top: 18px;
`;

const Writer = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGray};
  text-align: right;
  margin-top: 12px;
`;
