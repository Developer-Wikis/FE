// 2022-10-03T07:29:08 -> 22.10.03 07:29:08

export const convertDate = (date: string) => {
  return date.slice(2, 19).replace(/\T/, ' ').replace(/\-/g, '.');
};
