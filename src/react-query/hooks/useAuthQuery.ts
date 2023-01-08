import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useUser } from './useUser';

const useAuthQuery = <TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn' | 'queryKey'>,
) => {
  const router = useRouter();
  const { clearUser } = useUser();

  return useQuery(queryKey, queryFn, {
    ...options,
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/login');
          clearUser();
          return;
        }
      }

      options?.onError && options.onError(error);
    },
  });
};

export default useAuthQuery;
