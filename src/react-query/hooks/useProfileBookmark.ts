import { useQuery } from '@tanstack/react-query';
import { TQueryBookmark } from '~/components/domain/profile/Tab/Bookmark';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';
import useUrlState from '~/hooks/useUrlState';

const initialState: TQueryBookmark = {
  mainCategory: 'all',
  subCategory: 'all',
  page: 0,
};

const getBookmark = (query: TQueryBookmark) => userApi.getBookmark(query);

const useProfileBookmark = (isReady: boolean) => {
  const [query, setQuery] = useUrlState<TQueryBookmark>(initialState, (state) => ({
    tab: 'bookmark',
    ...state,
  }));

  const { user } = useUser();

  const fallback = { content: [], totalPages: 0, totalElements: 0 };
  const { data = fallback } = useQuery(
    [QUERY_KEY.user, QUERY_KEY.bookmark, query],
    () => getBookmark(query),
    {
      enabled: Boolean(user) || !isReady,
      keepPreviousData: true,
      staleTime: 0,
    },
  );

  return { query, setQuery, data };
};

export default useProfileBookmark;
