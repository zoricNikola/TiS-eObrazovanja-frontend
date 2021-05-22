export interface Page<T> {
  content: T[];
  contentCount: number;
  totalItemsCount: number;
  totalPagesCount: number;
  pageSize: number;
  currentPage: number;
}
