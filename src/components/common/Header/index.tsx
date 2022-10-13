import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from '~/components/base/Link';
import PageContainer from '~/components/common/PageContainer';
import CategoryListItem from './CategoryListItem';

const Header = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.pathname === '/') {
      setSelectedCategory(router.query.mainCategory === 'be' ? 'be' : 'fe');
    } else {
      setSelectedCategory('');
    }
  }, [router.isReady, router.query]);

  return (
    <StyledHeader>
      <HeaderContent>
        <LeftArea>
          <Logo>
            <Link href="/">developerwiki</Link>
          </Logo>
          <CategoryList>
            <CategoryListItem
              href="/?mainCategory=fe"
              select={selectedCategory === 'fe'}
              name="프론트엔드"
              shallow
            />
            <CategoryListItem
              href="/?mainCategory=be"
              select={selectedCategory === 'be'}
              name="백엔드"
              shallow
            />
          </CategoryList>
        </LeftArea>
        <Link size="sm" linkType="black" href="/question/create">
          질문 등록
        </Link>
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
  align-items: center;
`;

const CategoryList = styled.ul`
  display: flex;
  margin-left: 40px;
`;

const Logo = styled.h1`
  font-size: 20px;
`;
