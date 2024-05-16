export interface Pagination {
  pageSize: number;
  page: number;
  totalRecords: number;
}

export interface SearchResponse<T> {
  contents: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalSize: number;
}

export interface TableAction<T> {
  icon: string;
  color: string;
  tooltip: string;
  action: (row: T) => void;
}
