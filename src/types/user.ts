export interface IUser {
  id: number | null;
  username: string;
  email: string;
  profileUrl: string;
}
export interface ICurrentUser {
  token: string;
  user: IUser;
}

export interface User {
  token: string;
  id: number;
  username: string;
  email: string;
  profileUrl: string;
}
