export const formatNumber = (num: number) => {
  if (num < 10000) return num.toLocaleString();
  if (num / 10000 < 10) return `${(num / 1000).toFixed(1)}만`;
  return `${Math.floor(num / 10000)}만`;
};

// 2022-10-03T07:29:08 -> 22.10.03 07:29:08
export const formatDate = (date: string) => {
  return date.slice(2, 19).replace(/\T/, ' ').replace(/\-/g, '.');
};

export const formatTime = (minutes: number, seconds: number) => {
  return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};
