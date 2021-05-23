import { environment } from 'src/environments/environment';

export class PageParams {
  page: number;
  size: number;

  constructor(page: number | string | null, size: number | string | null) {
    this.page = page && !isNaN(+page) ? +page : 1;
    this.size = size && !isNaN(+size) ? +size : environment.defaultPageSize;
  }
}
