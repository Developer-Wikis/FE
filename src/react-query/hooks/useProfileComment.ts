import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';

const initialState = {
  page: 0,
};

type Params = {
  page: number;
};

const getComment = (query: Params) => userApi.getComment(query);

const useProfileComment = () => {
  const [query, setQuery] = useState<Params>(initialState);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const prefetch = () =>
    queryClient.prefetchQuery([QUERY_KEY.user, QUERY_KEY.comments, initialState], () =>
      getComment(initialState),
    );

  const fallback = { content: [], totalPages: 0, totalElements: 0 };
  const { data = fallback } = useQuery(
    [QUERY_KEY.user, QUERY_KEY.comments, query],
    () => getComment(query),
    {
      enabled: Boolean(user),
    },
  );

  return { query, setQuery, data, prefetch };
};

export default useProfileComment;
