import { useState } from 'react';
import styled from '@emotion/styled';
import PageContainer from '~/components/common/PageContainer';
import Pagination from '~/components/common/Pagination';
import Tab, { TTab } from '~/components/domain/profile/Tab';
import UserInfo from '~/components/domain/profile/UserInfo';
import Bookmark, { TQueryBookmark, TSubQuery } from '~/components/domain/profile/Tab/Bookmark';
import Comment, { TQueryComment } from '~/components/domain/profile/Tab/Comment';
import { IUser } from '~/types/user';

/*
TODO:
- useUser 적용
- api 연결
- 반응형 대응
- URI query (/profile?tab=question&page=1) - UI 동기화
- 더미데이터 제거
*/

export type TQuery = TQueryBookmark | TQueryComment;

const Profile = () => {
  const [query, setQuery] = useState<TQuery>({
    tab: 'question',
    subQuery: { mainCategory: 'all', subCategory: 'all' },
    content: [],
    page: 0,
    totalPage: 5,
  });

  const handlePageChange = (page: number) => handleChange('page', page);
  const handleChange = (name: string, value: TTab | TSubQuery | number) => {
    // api 연결 후 응답값으로 setQuery
    setQuery({ ...query, [name]: value });

    alert(JSON.stringify({ ...query, [name]: value }, null, 2));
  };

  return (
    <StyledPageContainer>
      <StyledUserInfo user={{} as IUser} />
      <StyledProfileTab tab={query.tab} onChange={handleChange} />
      <TabContent>
        {query.tab === 'question' && <Bookmark query={query} onChange={handleChange} />}
        {query.tab === 'comment' && <Comment content={query.content} />}
      </TabContent>
      <Pagination totalElements={query.totalPage * 20} onChange={handlePageChange} />
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
