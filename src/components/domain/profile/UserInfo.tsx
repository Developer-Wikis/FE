import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import Avatar from '~/components/common/Avatar';
import { IUser } from '~/types/user';

interface UserInfoProps {
  user: IUser;
}

const UserInfo = ({ user, ...props }: UserInfoProps) => {
  return (
    <Container {...props}>
      <Avatar src={user.profileUrl} size="md" />
      <Username>{user.username || 'jini'}</Username>
      <Link href={`/profile/edit`} linkType="borderGray" size="sm">
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

const Username = styled.h3`
  margin-left: 12px;
  margin-right: 14px;
  ${({ theme }) => theme.fontStyle.headline1}
`;
