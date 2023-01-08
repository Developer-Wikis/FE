import { useRouter } from 'next/router';
import userApi from '~/service/user';
import oauthApi from '~/service/oauth';
import { useUser } from './useUser';
import useAuthMutation from './useAuthMutation';

export const useAuth = () => {
  const { setUser, clearUser } = useUser();
  const router = useRouter();

  const login = async (code: string, redirectUrl: string) => {
    try {
      const res = await oauthApi.googleLogin({ code, redirectUrl });

      setUser(
        {
          token: res.data.accessToken,
          id: res.data.id,
          username: res.data.username || res.data.name,
          email: res.data.email,
          profileUrl: res.data.profileUrl || '',
        },
        res.data.refreshToken,
      );
      router.push('/');
    } catch {
      clearUser();
      alert('로그인에 실패했습니다.');
      router.push('/login');
    }
  };

  const logout = () => {
    clearUser();
  };

  const { mutate: deleteAccount } = useAuthMutation(userApi.deleteAccount, {
    onSuccess: () => {
      clearUser();
      alert('계정이 성공적으로 삭제되었습니다.');
      router.push('/');
    },
    onError: () => {
      alert('계정 삭제에 실패했습니다.');
    },
  });

  return {
    login,
    logout,
    deleteAccount,
  };
};
