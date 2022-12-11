export type Nullable<T> = T | null;

export type Paging<Element> = {
  content: Element[];
  totalPages: number;
  totalElements: number;
};
