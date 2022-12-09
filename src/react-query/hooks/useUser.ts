import useStorage from '~/hooks/useStorage';
import { useQuery, useQueryClient, QueryObserverResult } from '@tanstack/react-query';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { IUser, User } from '~/types/user';
import { LOCAL_KEY } from '~/utils/constant/user';

interface UseUser {
  user: IUser | null;
  setUser: (user: User, refreshToken: string) => void;
  clearUser: () => void;
  fetchUser: () => Promise<IUser | null>;
  refetch: () => Promise<QueryObserverResult<IUser>>;
}

const tokenToUserData = async (token: string) => {
  if (!token) return null;
  return await userApi.getUserInfo();
};

export const useUser = (): UseUser => {
  const storage = useStorage('local');

  const queryClient = useQueryClient();
  const queryFn = () => {
    const token = storage.getItem(LOCAL_KEY.token, '');
    return tokenToUserData(token);
  };

  const { data: user = null, refetch } = useQuery<IUser>([QUERY_KEY.user], queryFn, {
    onError: () => {
      clearUser();
    },
    retry: false,
  });

  const setUser = (newUser: User, refreshToken: string) => {
    storage.setItem(LOCAL_KEY.token, newUser.token);
    storage.setItem(LOCAL_KEY.refresh, refreshToken);
    refetch();
  };

  const clearUser = () => {
    storage.removeItem(LOCAL_KEY.token);
    storage.removeItem(LOCAL_KEY.refresh);
    queryClient.setQueryData([QUERY_KEY.user], null);
    queryClient.removeQueries([QUERY_KEY.user]);
    queryClient.removeQueries([QUERY_KEY.question]);
  };

  const fetchUser = async () => {
    try {
      return queryClient.fetchQuery({ queryKey: [QUERY_KEY.user], queryFn });
    } catch {
      return null;
    }
  };

  return {
    user,
    setUser,
    clearUser,
    fetchUser,
    refetch,
  };
};
