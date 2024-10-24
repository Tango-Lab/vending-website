export interface IPagination<T> extends IPaginationKey {
  data: T[];
}

export interface IPaginationParam {
  limit: number | null;
  offset: number | null;
}

export interface IPaginationKey {
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
}
