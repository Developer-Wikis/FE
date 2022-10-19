import { MainType, SubType, SubWithAllType, SUB_CATEGORIES } from '../constant/category';
import { isString } from './checkType';

export const checkLength = (str: string, min: number, max: number) => {
  return str.length < min || str.length > max ? true : false;
};

export const checkSpace = (str: string) => {
  const reg = /\s/g;
  return str.match(reg);
};

export const checkSpecial = (str: string) => {
  const reg = /[^\w\sㄱ-힣]|[\_]/g;
  return str.match(reg);
};

export const checkNickname = (nickname: string) => {
  return checkLength(nickname, 2, 10) || checkSpecial(nickname);
};

export const checkPassword = (password: string) => {
  return checkLength(password, 4, 10) || checkSpace(password);
};

export const checkComment = (comment: string) => {
  return checkLength(comment, 2, 200);
};

export const checkTitle = (title: string) => {
  return checkLength(title, 2, 30);
};

export const checkTailQuestion = (text: string) => {
  return checkLength(text, 2, 30);
};

export const checkSuggestion = (text: string) => {
  return checkLength(text, 10, 300);
};

export const SUBMIT_CHECK = {
  nickname: {
    isValid: checkNickname,
    message: '닉네임은 특수문자 제외, 2~10자로 입력해 주세요.',
  },
  password: {
    isValid: checkPassword,
    message: '비밀번호는 공백 제외, 4~10자 이상 입력해 주세요.',
  },
  comment: {
    isValid: checkComment,
    message: '댓글의 내용은 2~200자로 입력해 주세요.',
  },
  title: {
    isValid: checkTitle,
    message: '질문 제목은 2~30자로 입력해 주세요.',
  },
  tailQuestion: {
    isValid: checkTailQuestion,
    message: '꼬리 질문은 2~30자로 입력해 주세요.',
  },
  suggestion: {
    isValid: checkSuggestion,
    message: '내용은 10자 이상 300자 이하로 입력해 주세요.',
  },
};

export const isValidCategoryPair = (main: MainType, sub: SubWithAllType) => {
  return sub === 'all' || (SUB_CATEGORIES[main] as ReadonlyArray<SubType>).includes(sub);
};

export const isValidRandomType = (type: unknown) => {
  return isString(type) && ['voice', 'text'].includes(type);
};
