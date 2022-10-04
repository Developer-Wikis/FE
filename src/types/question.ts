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
export interface IQuestionDetail {
  id: number;
  title: string;
  nickname: string;
  category: string;
  additionQuestions: string[];
  viewCount: number;
  commentCount: number;
  createdAt: string;
  prevId: number;
  nextId: number;
}

// 카테고리 확정되면 좀 더 세부적으로 타입 지정
export interface QuestionCategoryQuery {
  main: string;
  sub: string;
}
