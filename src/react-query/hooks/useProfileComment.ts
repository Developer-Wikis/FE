import { useQuery } from '@tanstack/react-query';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { useUser } from './useUser';
import useUrlState from '~/hooks/useUrlState';

const initialState = {
  page: 0,
};

type Params = {
  page: number;
};

const getComment = (query: Params) => userApi.getComment(query);

const useProfileComment = (isReady: boolean) => {
  const [query, setQuery, setQueryWithoutUrl] = useUrlState<Params>(initialState, (state) => ({
    tab: 'comment',
    ...state,
  }));

  const { user } = useUser();

  const fallback = { content: [], totalPages: 0, totalElements: 0 };
  const { data = fallback } = useQuery(
    [QUERY_KEY.user, QUERY_KEY.comments, query],
    () => getComment(query),
    {
      enabled: Boolean(user) || !isReady,
      keepPreviousData: true,
      staleTime: 0,
    },
  );

  return { query, setQuery, setQueryWithoutUrl, data };
};

export default useProfileComment;
