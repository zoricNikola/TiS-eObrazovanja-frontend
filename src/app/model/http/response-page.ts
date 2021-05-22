export interface ResponsePage<T> {
  content: T[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  size: number;
}
