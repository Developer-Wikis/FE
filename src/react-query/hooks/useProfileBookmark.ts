import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TQueryBookmark } from '~/components/domain/profile/Tab/Bookmark';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';
import useUrlState from '~/hooks/useUrlState';
import { IQuestionItem } from '~/types/question';
import { Paging } from '~/types/utilityType';
import { PAGE_SIZE } from '~/components/common/Pagination';

const initialState: TQueryBookmark = {
  mainCategory: 'all',
  subCategory: 'all',
  page: 0,
};

const filter = (query: TQueryBookmark) => {
  const { subCategory, ...withoutSubCategory } = query;
  return query.mainCategory === 'all' ? withoutSubCategory : query;
};
const getBookmark = (query: TQueryBookmark) => userApi.getBookmark(filter(query));

const useProfileBookmark = (isReady: boolean) => {
  const queryClient = useQueryClient();
  const [query, setQuery, setQueryWithoutUrl] = useUrlState<TQueryBookmark>(
    initialState,
    (state) => ({
      tab: 'bookmark',
      ...filter(state),
    }),
  );

  const { user } = useUser();

  const fallback = { content: [], totalPages: 0, totalElements: 0 };
  const { data = fallback, refetch } = useQuery(
    [QUERY_KEY.user, QUERY_KEY.bookmark, query],
    () => getBookmark(query),
    {
      enabled: Boolean(user) || !isReady,
      keepPreviousData: true,
      staleTime: 0,
    },
  );

  const hasContentOn = (page: number): boolean => {
    if (page < data.totalPages - 1) {
      return true;
    }

    const curPageData: Paging<IQuestionItem> | undefined = queryClient.getQueryData([
      QUERY_KEY.user,
      QUERY_KEY.bookmark,
      query,
    ]);
    if (curPageData === undefined) {
      return false;
    }

    const curTotalElements =
      data.totalElements - curPageData.content.filter(({ isBookmarked }) => !isBookmarked).length;
    const curTotalPages = Math.floor(curTotalElements / PAGE_SIZE);
    return page <= curTotalPages;
  };

  return { query, setQuery, setQueryWithoutUrl, data, hasContentOn, refetch };
};

export default useProfileBookmark;
