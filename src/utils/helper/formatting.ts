export const formatNumber = (num: number) => {
  if (num < 10000) return num.toLocaleString();
  if (num / 10000 < 10) return `${(num / 1000).toFixed(1)}만`;
  return `${Math.floor(num / 10000)}만`;
};
