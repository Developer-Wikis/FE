export interface IQuestionItem {
  id: number;
  title: string;
  nickname: string;
  category: string;
  viewCount: number;
  commentCount: number;
  createAt: string;
}

export interface IQuestion {
  nickname: string;
  password: string;
  title: string;
  category: string;
  additionQuestions: string[];
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
