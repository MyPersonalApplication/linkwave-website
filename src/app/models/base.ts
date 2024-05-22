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

export interface Item {
  imageSrc: string;
  imageAlt: string;
}

export interface MonthlyStats {
  month: string;
  postCount: number;
  postLikeCount: number;
  postCommentCount: number;
}

export interface MonthlyMessageStats {
  month: string;
  conversationCount: number;
  chatMessageCount: number;
}
