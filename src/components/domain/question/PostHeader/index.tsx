import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Icon from '~/components/base/Icon';
import PageTitle from '~/components/base/PageTitle';
import useBookmark from '~/react-query/hooks/useBookmark';
import { useUser } from '~/react-query/hooks/useUser';
import { SubType } from '~/utils/constant/category';
import { convertSubCategory } from '~/utils/helper/converter';

interface PostHeaderProps {
  subCategory: SubType;
  title: string;
  questionId: number;
}

const PostHeader = ({ subCategory, title, questionId }: PostHeaderProps) => {
  const { isBookmarked, postBookmark } = useBookmark({ questionId });
  const { user } = useUser();
  const router = useRouter();

  const onBookmarkToggle = async () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      return;
    }

    postBookmark(!isBookmarked);
  };

  return (
    <Container>
      <StyledIconButton
        name="Star"
        width="21"
        height="20"
        fill={isBookmarked ? 'red' : 'gray100'}
        stroke={isBookmarked ? 'red' : 'gray300'}
        onClick={onBookmarkToggle}
        aria-label={`북마크 ${isBookmarked ? '삭제' : '추가'}하기`}
      />
      <CategoryName>{convertSubCategory(subCategory)}</CategoryName>
      <PostTitle>{title}</PostTitle>
    </Container>
  );
};

export default PostHeader;

const Container = styled.div`
  position: relative;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  padding-bottom: 30px;
`;
const CategoryName = styled.div`
  ${({ theme }) => theme.fontStyle.body2};
  color: ${({ theme }) => theme.colors.gray500};
`;

const PostTitle = styled(PageTitle)`
  margin-top: 18px;
`;

const StyledIconButton = styled(Icon.Button)`
  width: auto;
  padding: 7px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 2px rgba(204, 204, 204, 0.25);
  position: absolute;
  top: -8px;
  right: 18px;
`;
