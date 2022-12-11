export interface IUser {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
  commentSize: number;
  bookmarkSize: number;
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
