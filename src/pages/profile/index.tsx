import { useEffect } from 'react';
import styled from '@emotion/styled';
import PageContainer from '~/components/common/PageContainer';
import Tab from '~/components/domain/profile/Tab';
import UserInfo from '~/components/domain/profile/UserInfo';
import Bookmark from '~/components/domain/profile/Tab/Bookmark';
import Comment from '~/components/domain/profile/Tab/Comment';
import { useRouter } from 'next/router';
import useTab from '~/hooks/useTab';
import useUserWithGuard from '~/hooks/useUserWithGuard';

const Profile = () => {
  const { tab, setTab, TabItem } = useTab(null, { bookmark: Bookmark, comment: Comment });
  const currentUser = useUserWithGuard();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    switch (router.query.tab) {
      case 'bookmark':
      case 'comment':
        setTab(router.query.tab);
        break;
      default:
        setTab('bookmark');
    }
  }, [router.isReady]);

  useEffect(() => {
    currentUser.refetch();
  }, [router.query]);

  if (!currentUser.user) {
    return null;
  }
  return (
    <StyledPageContainer>
      <StyledUserInfo user={currentUser.user} />
      <StyledProfileTab user={currentUser.user} tab={tab} onChange={setTab} />
      <TabContent>{TabItem && <TabItem />}</TabContent>
    </StyledPageContainer>
  );
};

export default Profile;

const StyledPageContainer = styled(PageContainer)`
  margin-top: 47px;
`;

const StyledUserInfo = styled(UserInfo)`
  margin-bottom: 29px;
`;

const StyledProfileTab = styled(Tab)`
  margin-bottom: 18px;
`;

const TabContent = styled.div`
  margin-bottom: 32px;
`;
