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

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('itemsCount') itemsCount: number = 0;
  @Input('pageSize') pageSize: number = 20;
  @Input('currentPage') currentPage: number = 0;
  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter();
  @Output('pageSizeChange') pageSizeChange: EventEmitter<number> =
    new EventEmitter();

  pageSizeOptions: number[] = [10, 20, 50, 100];

  numberOfPages: number = 0;
  pages: number[] = [];
  slicedPages: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  refreshPagination(): void {
    if (!this.pageSizeOptions.includes(this.pageSize)) {
      this.pageSizeOptions.push(this.pageSize);
      this.pageSizeOptions = _.sortBy(this.pageSizeOptions);
    }

    this.numberOfPages = Math.ceil(this.itemsCount / this.pageSize);
    this.pages = _.range(1, this.numberOfPages + 1);

    if (this.numberOfPages > 5) {
      if (this.currentPage < 4) {
        this.slicedPages = this.pages.slice(0, 5);
      } else if (this.currentPage > this.numberOfPages - 3) {
        this.slicedPages = this.pages.slice(this.numberOfPages - 5);
      } else {
        this.slicedPages = this.pages.slice(
          this.currentPage - 3,
          this.currentPage + 2
        );
      }
    } else this.slicedPages = this.pages;

    if (!this.slicedPages.includes(this.currentPage)) this.pageChange.emit(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.currentPage &&
      this.numberOfPages > 0 &&
      (changes.currentPage.currentValue < 1 ||
        changes.currentPage.currentValue > this.numberOfPages)
    )
      return;
    this.refreshPagination();
  }

  onPageChange(selectedPage: number): void {
    if (selectedPage === this.currentPage) return;
    if (selectedPage < 1 || selectedPage > this.numberOfPages) return;
    this.pageChange.emit(selectedPage);
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.pageSizeChange.emit(selectedPageSize);
  }
}
