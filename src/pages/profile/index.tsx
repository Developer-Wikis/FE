import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PageContainer from '~/components/common/PageContainer';
import Tab, { TTab } from '~/components/domain/profile/Tab';
import UserInfo from '~/components/domain/profile/UserInfo';
import Bookmark from '~/components/domain/profile/Tab/Bookmark';
import Comment from '~/components/domain/profile/Tab/Comment';
import { IUser } from '~/types/user';
import { useUser } from '~/react-query/hooks/useUser';
import useProfileBookmark from '~/react-query/hooks/useProfileBookmark';
import useProfileComment from '~/react-query/hooks/useProfileComment';

/*
TODO:
- api 연결
- 반응형 대응
- URI query (/profile?tab=question&page=1) - UI 동기화
*/

const Profile = () => {
  const [tab, setTab] = useState<TTab>('question');

  const { user } = useUser();
  const bookmark = useProfileBookmark();
  const comment = useProfileComment();

  useEffect(() => {
    bookmark.prefetch();
    comment.prefetch();
  }, []);

  return (
    <StyledPageContainer>
      <StyledUserInfo user={user || ({} as IUser)} />
      <StyledProfileTab tab={tab} onChange={setTab} />
      <TabContent>
        {tab === 'question' && (
          <Bookmark query={bookmark.query} data={bookmark.data} onChange={bookmark.setQuery} />
        )}
        {tab === 'comment' && (
          <Comment query={comment.query} data={comment.data} onChange={comment.setQuery} />
        )}
      </TabContent>
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
