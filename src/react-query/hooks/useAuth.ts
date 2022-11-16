import useStorage from '~/hooks/useStorage';
import { googleLogin } from '~/service/oauth';
import { getUserInfo } from '~/service/user';
import { LOCAL_KEY } from '~/utils/constant/user';
import { useUser } from './useUser';

export const useAuth = () => {
  const { setUser, clearUser } = useUser();
  const storage = useStorage('local');

  const login = async (code: string, redirectUrl: string) => {
    const res = await googleLogin({ code, redirectUrl });

    if (!res) {
      storage.removeItem(LOCAL_KEY.token);
      return;
    }

    storage.setItem(LOCAL_KEY.token, res.data.accessToken);
    storage.setItem(LOCAL_KEY.refresh, res.data.refreshToken);

    setUser({
      token: res.data.accessToken,
      id: res.data.id,
      username: res.data.username || res.data.name,
      email: res.data.email,
      profileUrl: res.data.profileUrl || '',
    });
  };

  const logout = () => {
    clearUser();
  };

  const updateUser = async (token: string) => {
    const newUser = await getUserInfo(token);
    setUser({
      token,
      ...newUser,
    });
  };

  return {
    login,
    logout,
    updateUser,
  };
};
