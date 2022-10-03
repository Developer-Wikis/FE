import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import PageContainer from '~/components/common/PageContainer';
import CategoryListItem from './CategoryListItem';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <LeftArea>
          <h1>
            <Link href="/">developerwiki</Link>
          </h1>
          <CategoryList>
            <CategoryListItem href="/?dev=fe" name="프론트엔드" />
            <CategoryListItem href="/?dev=be" name="백엔드" />
          </CategoryList>
        </LeftArea>
        <Link href="/question/create">질문 등록</Link>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const HeaderContent = styled(PageContainer)`
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;
`;

const LeftArea = styled.div`
  display: flex;
`;

const CategoryList = styled.ul`
  display: flex;
  margin-left: 40px;
`;
