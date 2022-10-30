import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Link from '~/components/base/Link';
import PageContainer from '~/components/common/PageContainer';
import Logo from '../Logo';
import CategoryListItem from './CategoryListItem';
import Icon from '~/components/base/Icon/index';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Slide from './Slide';
import useStorage from '~/hooks/useStorage';
import { LOCAL_KEY } from '~/utils/constant/user';
import { UserContext } from '~/context/user';

const Header = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const storage = useStorage('local');
  const { currentUser } = useContext(UserContext);

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

  useEffect(() => {
    const token = storage.getItem(LOCAL_KEY.token, '');
    if (token && token !== currentUser.token) {
      /* 토큰으로 유저 정보 재발급 코드 작성 */
    }
  }, []);

  return (
    <StyledHeader>
      <HeaderContent>
        <LeftArea>
          <FirstRow>
            <Link href="/">
              <h1>
                <Logo />
              </h1>
            </Link>

            {/* 햄버거가 될 예정*/}
            <Hambuger name="Menu" color="gray800" size="24" onClick={() => setIsOpen(true)} />
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
          {/* id로 비교할 예정 */}
          {!currentUser.token && (
            <Link size="sm" linkType="borderGray" href="/login">
              로그인
            </Link>
          )}

          <Link size="sm" linkType="red" href="/random/create?step=0" as="/random/create">
            랜덤 질문
          </Link>
          <Link size="sm" linkType="black" href="/question/create">
            질문 등록
          </Link>
        </RightArea>
      </HeaderContent>

      <Slide isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const HeaderContent = styled(PageContainer)`
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;

  ${mediaQuery('sm')} {
    display: block;
    height: 128px;
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
    height: 64px;
  }
`;

const CategoryList = styled.ul`
  display: flex;
`;

const Hambuger = styled(Icon.Button)`
  display: none;

  ${mediaQuery('sm')} {
    display: block;
  }
`;

const RightArea = styled.div`
  a ~ a {
    margin-left: 15px;
  }

  ${mediaQuery('sm')} {
    display: none;
  }
`;
