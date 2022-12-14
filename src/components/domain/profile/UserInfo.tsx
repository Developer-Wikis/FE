import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import UserProfile from '~/components/common/UserProfile';
import { IUser } from '~/types/user';

interface UserInfoProps {
  user: IUser;
}

const UserInfo = ({ user, ...props }: UserInfoProps) => {
  return (
    <Container {...props}>
      <StyledUserProfile profileUrl={user.profileUrl} text={user.username} fontSize="lg" />
      <Link href={`/profile/edit`} variant="borderGray" size="sm">
        회원 정보 수정
      </Link>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserProfile = styled(UserProfile)`
  margin-right: 14px;
`;
