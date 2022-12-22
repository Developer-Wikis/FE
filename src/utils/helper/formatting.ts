import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatNumber = (num: number) => {
  if (num < 10000) return num.toLocaleString();
  if (num / 10000 < 10) return `${(num / 1000).toFixed(1)}만`;
  return `${Math.floor(num / 10000)}만`;
};

// 2022-10-03T07:29:08 -> 약 1개월 전
export const formatDate = (date: string) => {
  return formatDistance(new Date(date), new Date(), { locale: ko, addSuffix: true });
};

export const formatTime = (minutes: number, seconds: number) => {
  return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};
