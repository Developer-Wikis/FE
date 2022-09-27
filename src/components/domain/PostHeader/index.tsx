import styled from '@emotion/styled';

interface PostHeaderProps {
  category: string;
  title: string;
  writer: string;
}

const PostHeader = ({ category, title, writer }: PostHeaderProps) => {
  return (
    <Container>
      <CategoryName>{category}</CategoryName>
      <PostTitle>{title}</PostTitle>
      <Writer>
        <span>작성자: {writer}</span>
      </Writer>
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

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 18px;
`;

const Writer = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mediumGray};
  text-align: right;
  margin-top: 12px;
`;
