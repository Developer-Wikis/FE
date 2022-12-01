export interface ICommentItem {
  id: number;
  username: string;
  role: 'ANONYMOUS' | 'USER';
  userId: number;
  content: string;
  createdAt: string;
}
