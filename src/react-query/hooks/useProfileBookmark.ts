import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TQueryBookmark } from '~/components/domain/profile/Tab/Bookmark';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';

const initialState: TQueryBookmark = {
  mainCategory: 'all',
  subCategory: 'all',
  page: 0,
};

const getBookmark = (query: TQueryBookmark) => userApi.getBookmark(query);

const useProfileBookmark = () => {
  const [query, setQuery] = useState<TQueryBookmark>(initialState);

  const { user } = useUser();
  const queryClient = useQueryClient();

  const prefetch = () =>
    queryClient.prefetchQuery([QUERY_KEY.user, QUERY_KEY.bookmark, initialState], () =>
      getBookmark(initialState),
    );

  const fallback = { content: [], totalPages: 0, totalElements: 0 };
  const { data = fallback } = useQuery(
    [QUERY_KEY.user, QUERY_KEY.bookmark, query],
    () => getBookmark(query),
    {
      enabled: Boolean(user),
    },
  );

  return { query, setQuery, data, prefetch };
};

export default useProfileBookmark;
