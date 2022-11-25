import useStorage from '~/hooks/useStorage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import userApi from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { User } from '~/types/user';
import { LOCAL_KEY } from '~/utils/constant/user';

interface UseUser {
  user: User | null;
  setUser: (user: User, refreshToken: string) => void;
  clearUser: () => void;
  fetchUser: () => Promise<User | null>;
}

const tokenToUserData = async (token: string) => {
  if (!token) return null;

  const userData = await userApi.getUserInfo();
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
      clearUser();
    },
    retry: false,
  });

  const setUser = (newUser: User, refreshToken: string) => {
    storage.setItem(LOCAL_KEY.token, newUser.token);
    storage.setItem(LOCAL_KEY.refresh, refreshToken);
    queryClient.setQueryData([QUERY_KEY.user], newUser);
  };

  const clearUser = () => {
    storage.removeItem(LOCAL_KEY.token);
    storage.removeItem(LOCAL_KEY.refresh);
    queryClient.setQueryData([QUERY_KEY.user], null);
    queryClient.removeQueries([QUERY_KEY.user]);
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
