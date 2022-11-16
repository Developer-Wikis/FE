import styled from '@emotion/styled';
import { MouseEvent, useContext, useState } from 'react';
import Link from '~/components/base/Link';
import { UserContext } from '~/context/user';
import useClickAway from '~/hooks/useClickAway';
import { User } from '~/types/user';
import Avatar from '../Avatar';

interface ProfileDropdownProps {
  user: User;
}

const ProfileDropdown = ({ user: { username, profileUrl } }: ProfileDropdownProps) => {
  const { logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const ref = useClickAway<HTMLDetailsElement>(() => {
    if (open) handleClick();
  });

  const handleClick = () => setOpen(!open);

  const handleToggle = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    handleClick();
  };

  const handleLogout = () => {
    handleClick();
    logout();
  };

  return (
    <StyledDetails open={open} ref={ref}>
      <StyledSummary>
        <ProfileImage>
          <span className="screen-out">프로필 메뉴 열기</span>
          <Avatar src={profileUrl} size="md" onClick={handleToggle} />
        </ProfileImage>
      </StyledSummary>

      <Content>
        <UsernameContainer>
          <Username>{username} 님</Username>
        </UsernameContainer>

        <StyledUl>
          <StyledLi>
            <Link href="/question/create" onClick={handleClick}>
              질문 등록
            </Link>
          </StyledLi>
          <StyledLi>
            <Link href="/my" onClick={handleClick}>
              마이페이지
            </Link>
          </StyledLi>
          <StyledLi>
            <Link href="/" onClick={handleLogout}>
              로그아웃
            </Link>
          </StyledLi>
        </StyledUl>
      </Content>
    </StyledDetails>
  );
};

export default ProfileDropdown;

const StyledDetails = styled.details`
  position: relative;
`;

const StyledSummary = styled.summary`
  list-style: none;
  cursor: pointer;

  &::webkit-details-marker {
    display: none;
  }
`;

const ProfileImage = styled.div`
  height: 46px;
`;

const Content = styled.div`
  position: absolute;
  top: 56px;
  left: -22px;
  min-width: 139px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 2px rgba(204, 204, 204, 0.25);

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 40px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 7px solid ${({ theme }) => theme.colors.gray300};
  }

  &::after {
    content: '';
    position: absolute;
    top: -7px;
    left: 41px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 7px solid ${({ theme }) => theme.colors.white};
  }
`;

const UsernameContainer = styled.div`
  padding: 12px 16px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const Username = styled.span`
  ${({ theme }) => theme.fontStyle.body2}
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
  user-select: none;
`;

const StyledUl = styled.ul`
  padding: 16px 0;

  li ~ li {
    margin-top: 8px;
  }
`;

const StyledLi = styled.li`
  ${({ theme }) => theme.fontStyle.body2}

  a {
    display: block;
    padding: 0 16px;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;
