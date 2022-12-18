import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '~/react-query/hooks/useUser';

const useUserWithGuard = () => {
  const currentUser = useUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.isLoading || currentUser.user) return;

    router.push('/');
  }, [currentUser.isLoading, currentUser.user]);

  return {
    ...currentUser,
  };
};

export default useUserWithGuard;
