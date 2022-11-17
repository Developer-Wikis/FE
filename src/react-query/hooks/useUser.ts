import useStorage from '~/hooks/useStorage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { User } from '~/types/user';
import { LOCAL_KEY } from '~/utils/constant/user';
import { useMemo } from 'react';

interface UseUser {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<User | null>;
}

const tokenToUserData = async (token: string) => {
  if (!token) return null;

  const userData = await getUserInfo(token);
  return {
    ...userData,
    /* API username으로 변경되면 수정 */
    username: userData.name || userData.username,
  };
};

export const useUser = (): UseUser => {
  const storage = useStorage('local');
  const token = storage.getItem(LOCAL_KEY.token, '');

  const queryClient = useQueryClient();
  const queryFn = () => tokenToUserData(token);

  const { data: user = null } = useQuery<User>([QUERY_KEY.user], queryFn, {
    onError: () => {
      storage.removeItem(LOCAL_KEY.token);
    },
    retry: false,
  });

  const setUser = (newUser: User) => {
    queryClient.setQueryData([QUERY_KEY.user], newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEY.user], null);
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
  };
};
