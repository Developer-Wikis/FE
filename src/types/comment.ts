export interface ICommentItem {
  id: number;
  username: string;
  role: 'ANONYMOUS' | 'USER';
  userId: number;
  content: string;
  profileUrl: string;
  createdAt: string;
}

interface AnonymousComment {
  nickname: string;
  password: string;
  content: string;
}
interface UserComment {
  content: string;
}

export type CommentType = AnonymousComment | UserComment;
