import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '~/service/user';
import { QUERY_KEY } from '../queryKey';
import { User } from '~/types/user';

interface UseUser {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
// 유저데이터는
const getUser = async (user: User | null) => {
  if (!user) return null;

  const userData = await getUserInfo(user.token);
  return userData;
};

export const useUser = (): UseUser => {
  const queryClient = useQueryClient();

  const { data: user = null } = useQuery<User>([QUERY_KEY.user], () => getUser(user));

  const setUser = (newUser: User) => {
    queryClient.setQueryData([QUERY_KEY.user], newUser);
  };

  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEY.user], null);
  };

  return {
    user,
    setUser,
    clearUser,
  };
};
