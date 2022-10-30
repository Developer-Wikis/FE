import { createContext, ReactNode, useCallback, useState } from 'react';

// id필요
// refresh token
// userEmail/userName -> email/username로 변경 예정

const initialValue = {
  token: '',
  user: {
    username: '',
    email: '',
  },
};

interface IUser {
  username: string;
  email: string;
}
interface ICurrentUser {
  token: string;
  user: IUser;
}

interface UserContextTypes {
  currentUser: ICurrentUser;
  updateUser: (userData: ICurrentUser) => void;
}

export const UserContext = createContext<UserContextTypes>({} as UserContextTypes);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(initialValue);

  const updateUser = useCallback((userData: ICurrentUser) => {
    setCurrentUser(userData);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, updateUser }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
