import styled from '@emotion/styled';
import PageContainer from '~/components/common/PageContainer';
import CategoryListItem from './CategoryListItem';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <h1>developerwiki</h1>
        <CategoryList>
          <CategoryListItem href="/" name="프론트엔드" />
          <CategoryListItem href="/" name="백엔드" />
        </CategoryList>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.LightGray};
`;

const HeaderContent = styled(PageContainer)`
  display: flex;
  height: 70px;
  align-items: center;
`;

const CategoryList = styled.div`
  display: flex;
  margin-left: 40px;
`;
