import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useUser } from './useUser';

const useAuthQuery = <
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn' | 'queryKey'>,
) => {
  const { clearUser } = useUser();

  return useQuery(queryKey, queryFn, {
    ...options,
    retry: (failureCount, error) => {
      if (failureCount >= 3) {
        return false;
      }

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          clearUser();
          return false;
        }
      }
      return true;
    },
  });
};

export default useAuthQuery;
