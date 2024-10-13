export interface IPagination<T> extends IPaginationKey {
  data: T[];
}

export interface IPaginationParam {
  limit: number;
  offset: number;
}

export interface IPaginationKey {
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
}
