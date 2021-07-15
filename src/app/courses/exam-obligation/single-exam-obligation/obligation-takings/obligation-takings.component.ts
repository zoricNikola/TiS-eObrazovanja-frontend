import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ExamObligationTakingPage } from 'src/app/model/exam-obligation/exam-obligation-taking-page';
import { ExamObligationService } from 'src/app/services/exam-obligation.service';
import { SortParamsUtils } from 'src/app/services/utils/sort-params-utils.service';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from 'src/app/model/http/page-params';
import { ExamObligation } from './../../../../model/exam-obligation/exam-obligation';
import { ExamObligationTakingFormDialogOptions } from '../exam-obligation-taking-form-dialog/exam-obligation-taking-form-dialog.component';
import { ExamObligationTakingService } from 'src/app/services/exam-obligation-taking.service';

@Component({
  selector: '[obligation-takings]',
  templateUrl: './obligation-takings.component.html',
  styleUrls: ['./obligation-takings.component.css'],
})
export class ObligationTakingsComponent implements OnInit {
  @Input('obligation') obligation!: ExamObligation;

  takingsPage$: Observable<ExamObligationTakingPage> = of();

  takingsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
  });

  constructor(
    private examObligationService: ExamObligationService,
    public sortParamsUtils: SortParamsUtils,
    private obligationTakingService: ExamObligationTakingService
  ) {}

  ngOnInit(): void {
    this.takingsPage$ = this.takingsQueryMap.pipe(
      switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
        };

        return this.examObligationService.filterExamObligationTakings(
          this.obligation.id!,
          pageParams,
          queryParams
        );
      })
    );
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    this.takingsQueryMap.next({
      ...this.takingsQueryMap.value,
      sort: newSortParams,
    });
  }

  onPageChange(selectedPage: number): void {
    this.takingsQueryMap.next({
      ...this.takingsQueryMap.value,
      page: selectedPage,
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.takingsQueryMap.next({
      ...this.takingsQueryMap.value,
      size: selectedPageSize,
    });
  }

  takingFormDialogOpened: boolean = false;
  takingFormDialogOptions: ExamObligationTakingFormDialogOptions = {
    cancel: () => {},
    save: (taking: any) => {},
  };

  onNewTakingClick(): void {
    this.takingFormDialogOpened = true;

    this.takingFormDialogOptions = {
      cancel: () => (this.takingFormDialogOpened = false),
      save: (taking: any) => {
        this.obligationTakingService
          .createTaking({ ...taking, examObligation: this.obligation })
          .pipe(take(1))
          .subscribe((id) => {
            this.takingFormDialogOpened = false;

            this.takingsQueryMap.next({
              ...this.takingsQueryMap.value,
              r: 'r',
            });
          });
      },
    };
  }
}
