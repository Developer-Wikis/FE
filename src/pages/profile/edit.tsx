import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PageTitle from '~/components/base/PageTitle';
import PageContainer from '~/components/common/PageContainer';
import DeleteAccount from '~/components/domain/profile/DeleteAccount';
import EditUserInfo from '~/components/domain/profile/EditUserInfo';
import { useAuth } from '~/react-query/hooks/useAuth';
import { useEditProfile } from '~/react-query/hooks/useEditProfile';
import { useUser } from '~/react-query/hooks/useUser';
import { SUBMIT_CHECK } from '~/utils/helper/validation';

/*
  inputField margin 0 props 추가 해야 할 듯?
  requeird 처리보단 알림 모달이 나을 것 같기도?
  모바일 대응 필요
*/

const ProfileEdit = () => {
  const { user, fetchUser } = useUser();
  const { deleteAccount } = useAuth();
  const router = useRouter();
  const { editUsername } = useEditProfile();

  const onEditNickname = (value: string) => {
    if (SUBMIT_CHECK.nickname.isValid(value)) {
      alert(SUBMIT_CHECK.nickname.message);
      return;
    }

    if (user) {
      editUsername({ userId: user?.id, username: value });
    }

    // 닉네임 변경 API 코드 작성
    // Toast 띄우기
  };

  const onDeleteAccount = () => {
    if (confirm('확인 버튼을 누르면 계정이 삭제됩니다.') && user) {
      deleteAccount(user.id);
    }
  };

  const checkUser = async () => {
    const user = await fetchUser();

    if (!user) {
      alert('잘못된 접근입니다.');
      router.push('/');
    }
  };

  useEffect(() => {
    if (!user) {
      checkUser();
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <PageTitle align="left">회원 정보 수정</PageTitle>
      <EditUserInfo user={user} onEditNickname={onEditNickname} />
      <Line />
      <PageTitle align="left">계정 삭제</PageTitle>
      <DeleteAccount onDeleteAccount={onDeleteAccount} />
    </Container>
  );
};

export default ProfileEdit;

const Container = styled(PageContainer)`
  margin-top: 50px;
`;

const Line = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray300};
  border: 0;
  margin: 33px 0 50px;
`;
