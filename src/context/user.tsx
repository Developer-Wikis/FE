import { createContext, ReactNode, useCallback, useState } from 'react';
import useStorage from '~/hooks/useStorage';
import { getUserInfo } from '~/service/user';
import { ICurrentUser } from '~/types/user';
import { LOCAL_KEY } from '~/utils/constant/user';

// refresh token
// userEmail/userName -> email/username로 변경 예정

const initialValue = {
  token: '',
  user: {
    id: null,
    username: '',
    email: '',
    profileUrl: '',
  },
};

interface Token {
  token: string;
  refreshToken: string;
}

interface UserContextTypes {
  currentUser: ICurrentUser;
  logout: () => void;
  updateUser: (token: string) => Promise<void>;
  login: ({ token, refreshToken }: Token) => void;
}

export const UserContext = createContext<UserContextTypes>({} as UserContextTypes);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(initialValue);

  const storage = useStorage('local');

  const login = useCallback(({ token, refreshToken }: Token) => {
    storage.setItem(LOCAL_KEY.token, token);
    storage.setItem(LOCAL_KEY.refresh, refreshToken);
    updateUser(token);
  }, []);

  const updateUser = useCallback(async (token: string) => {
    try {
      const { data } = await getUserInfo(token);
      if (!data) {
        logout();
        return;
      }
      setCurrentUser({
        token,
        user: {
          id: data.id,
          username: data.username || data.name,
          email: data.email,
          profileUrl: data.profileUrl,
        },
      });
    } catch {
      logout();
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(initialValue);
    storage.removeItem(LOCAL_KEY.token);
    storage.removeItem(LOCAL_KEY.refresh);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, updateUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
