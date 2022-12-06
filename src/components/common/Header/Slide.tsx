import styled from '@emotion/styled';
import { MouseEvent, useEffect } from 'react';
import BackgroundDim from '~/components/base/BackgroundDim';
import Link from '~/components/base/Link';
import { IUser } from '~/types/user';
import { ThemeColors } from '~/types/theme';
import CloseButton from '../CloseButton';
import Logo from '../Logo';
import UserProfile from '../UserProfile';
import { Nullable } from '~/types/utilityType';

interface SlideProps {
  user: Nullable<IUser>;
  isOpen: boolean;
  onClose: () => void;
}

const Slide = ({ user, isOpen, onClose }: SlideProps) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('modal-open');
    } else {
      document.querySelector('body')?.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <StyledBackgroundDim isOpen={isOpen} onClick={handleClose}>
      <SlideContainer isOpen={isOpen}>
        <SlideHeader>
          <Link href="/" onClick={onClose}>
            <Logo size="sm" />
          </Link>
          <StyledCloseButton onClick={onClose} />
        </SlideHeader>
        <SlideContent>
          <nav>
            <UserArea>
              {user ? (
                <Link href={`/profile/${user.id}`}>
                  <UserProfile profileUrl={user.profileUrl} text={user.username} />
                </Link>
              ) : (
                <LoginButton linkType="red" size="md" href="/login" onClick={onClose}>
                  로그인
                </LoginButton>
              )}
            </UserArea>
            <StyledUl>
              <li>
                <StyledLink
                  href="/random/create?step=0"
                  as="/random/create"
                  onClick={onClose}
                  color="red"
                >
                  랜덤질문
                </StyledLink>
              </li>
              <li>
                <StyledLink href="/question/create" onClick={onClose} color="gray800">
                  질문등록
                </StyledLink>
              </li>
            </StyledUl>
          </nav>

          <StyledLink href="/suggestion" onClick={onClose} color="gray800">
            건의하기
          </StyledLink>
        </SlideContent>
      </SlideContainer>
    </StyledBackgroundDim>
  );
};

export default Slide;

const StyledBackgroundDim = styled(BackgroundDim)<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
`;

const SlideContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 300px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-70%, 0, 0)')};
  transition: all 0.3s ease-in-out;
`;

const SlideHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px 42px;
  flex-grow: 1;
`;

const UserArea = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const LoginButton = styled(Link)`
  width: 100%;
  text-align: center;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 16px;
`;

const StyledUl = styled.ul`
  margin-top: 30px;
  li ~ li {
    margin-top: 14px;
  }
`;

const StyledLink = styled(Link)<{ color: ThemeColors }>`
  ${({ theme }) => theme.fontStyle.subtitle1}
  color: ${({ color, theme }) => theme.colors[color]};
  user-select: none;
`;
