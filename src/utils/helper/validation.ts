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
