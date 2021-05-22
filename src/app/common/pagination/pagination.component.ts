import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as _ from 'lodash-es';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[pagination]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('itemsCount') itemsCount: number = 0;
  @Input('pageSize') pageSize: number = environment.defaultPageSize;
  @Input('pagesCount') pagesCount: number = 0;
  @Input('currentPage') currentPage: number = 1;
  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter();
  @Output('pageSizeChange') pageSizeChange: EventEmitter<number> =
    new EventEmitter();

  pageSizeOptions: number[] = [10, 20, 50, 100];

  pages: number[] = [];
  slicedPages: number[] = [];
  firstPageItemIndex: number = 0;
  lastPageItemIndex: number = this.itemsCount;

  constructor() {}

  ngOnInit(): void {
    this.refreshPagination();
  }

  refreshPagination(): void {
    this.pages = _.range(1, this.pagesCount + 1);

    if (!this.pages.includes(this.currentPage)) this.pageChange.emit(1);

    if (!this.pageSizeOptions.includes(this.pageSize)) {
      this.pageSizeOptions.push(this.pageSize);
      this.pageSizeOptions = _.sortBy(this.pageSizeOptions);
    }

    if (this.pagesCount > 5) {
      if (this.currentPage < 4) {
        this.slicedPages = this.pages.slice(0, 5);
      } else if (this.currentPage > this.pagesCount - 3) {
        this.slicedPages = this.pages.slice(this.pagesCount - 5);
      } else {
        this.slicedPages = this.pages.slice(
          this.currentPage - 3,
          this.currentPage + 2
        );
      }
    } else this.slicedPages = this.pages;

    this.firstPageItemIndex = (this.currentPage - 1) * this.pageSize + 1;
    this.lastPageItemIndex =
      this.currentPage === this.pagesCount
        ? this.itemsCount
        : this.firstPageItemIndex + (this.pageSize - 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshPagination();
  }

  onPageChange(selectedPage: number): void {
    if (selectedPage === this.currentPage) return;
    if (selectedPage < 1 || selectedPage > this.pagesCount) return;
    this.pageChange.emit(selectedPage);
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.pageSizeChange.emit(selectedPageSize);
  }
}
