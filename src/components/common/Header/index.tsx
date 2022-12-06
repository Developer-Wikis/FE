import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Link from '~/components/base/Link';
import PageContainer from '~/components/common/PageContainer';
import Logo from '../Logo';
import Icon from '~/components/base/Icon/index';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import useStorage from '~/hooks/useStorage';
import { LOCAL_KEY } from '~/utils/constant/user';
import Slide from './Slide';
import CategoryListItem from './CategoryListItem';
import ProfileDropdown from './ProfileDropdown';
import { useUser } from '~/react-query/hooks/useUser';
import { useAuth } from '~/react-query/hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, fetchUser } = useUser();
  const { logout } = useAuth();
  const storage = useStorage('local');

  const getUserProfile = async () => {
    const token = storage.getItem(LOCAL_KEY.token, '');
    setIsLoading(true);

    // 로컬에서 토큰 삭제 시
    if (user && !token) {
      logout();
    }

    // 새로고침하여 userState 초기화 시
    if (token && !user) {
      await fetchUser();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
    <>
      <StyledHeader>
        <HeaderContent>
          <LeftArea>
            <FirstRow>
              <Link href="/">
                <h1>
                  <Logo />
                </h1>
              </Link>

              <Hamburger
                name="Hamburger"
                color="gray800"
                size="24"
                onClick={() => setIsOpen(true)}
              />
            </FirstRow>

            <Nav>
              <CategoryList>
                <CategoryListItem
                  href="/?mainCategory=fe"
                  select={selectedCategory === 'fe'}
                  name="프론트엔드"
                />
                <CategoryListItem
                  href="/?mainCategory=be"
                  select={selectedCategory === 'be'}
                  name="백엔드"
                />
              </CategoryList>
            </Nav>
          </LeftArea>

          <RightArea>
            {!user && !isLoading && (
              <Link size="sm" linkType="borderGray" href="/login">
                로그인
              </Link>
            )}
            {user && <ProfileDropdown user={user} />}
            <Link size="sm" linkType="red" href="/random/create?step=0" as="/random/create">
              랜덤 질문
            </Link>
          </RightArea>
        </HeaderContent>

        <Slide user={user} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </StyledHeader>
      <Line />
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('sm')} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
  }
`;

const HeaderContent = styled(PageContainer)`
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;

  ${mediaQuery('sm')} {
    display: block;
    height: auto;
  }
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;

  ${mediaQuery('sm')} {
    display: block;
  }
`;

const FirstRow = styled.div`
  ${mediaQuery('sm')} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    margin: 0 -16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 0 16px;
  }
`;

const Nav = styled.nav`
  margin-left: 40px;

  ${mediaQuery('sm')} {
    display: flex;
    align-items: center;
    margin-left: 0;
    height: 55px;
  }
`;

const CategoryList = styled.ul`
  display: flex;
`;

const Hamburger = styled(Icon.Button)`
  display: none;

  ${mediaQuery('sm')} {
    display: block;
  }
`;

const RightArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > a:last-of-type {
    margin-left: 14px;
  }

  ${mediaQuery('sm')} {
    display: none;
  }
`;

const Line = styled.hr`
  display: none;

  ${mediaQuery('sm')} {
    display: block;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.gray200};
    border: 0;
    margin: 0;
  }
`;
