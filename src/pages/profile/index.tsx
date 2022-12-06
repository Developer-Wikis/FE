import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PageContainer from '~/components/common/PageContainer';
import Tab from '~/components/domain/profile/Tab';
import UserInfo from '~/components/domain/profile/UserInfo';
import Bookmark from '~/components/domain/profile/Tab/Bookmark';
import Comment from '~/components/domain/profile/Tab/Comment';
import { IUser } from '~/types/user';
import { useUser } from '~/react-query/hooks/useUser';
import { useRouter } from 'next/router';
import useTab from '../../hooks/useTab';

/*
TODO:
- api 연결
- 반응형 대응
- URI query (/profile?tab=bookmark&page=1) - UI 동기화
*/

const Profile = () => {
  const [isReady, setIsReady] = useState(false);
  const { tab, setTab, TabItem } = useTab(null, { bookmark: Bookmark, comment: Comment });
  const { user } = useUser();
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
    setIsReady(true);
  }, [router.isReady]);

  return (
    <StyledPageContainer>
      <StyledUserInfo user={user || ({} as IUser)} />
      <StyledProfileTab tab={tab} onChange={setTab} />

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
