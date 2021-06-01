import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogOptions } from '../common/confirmation-dialog/confirmation-dialog.component';
import { FORM_STATE } from '../model/common/form-state';
import { ExamPeriod } from '../model/exam-period/exam-period';
import { ExamPeriodPage } from '../model/exam-period/exam-period-page';
import { PageParams } from '../model/http/page-params';
import { ExamPeriodService } from '../services/exam-period.service';
import { ExamPeriodFormDialogOptions } from './exam-period-form-dialog/exam-period-form-dialog.component';

@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css'],
  providers: [DatePipe]
})
export class ExamPeriodsComponent implements OnInit {

  @Input('selectable') selectable: boolean = false;

  showSearchBox: boolean = false;

  examPeriodForEdit: ExamPeriod | undefined = undefined;
  selectedEXamPeriod: ExamPeriod | undefined = undefined;

  examPeriodsPage$ : Observable<ExamPeriodPage> = of();
  

  constructor(private examPeriodService: ExamPeriodService, 
              private router: Router, 
              private route: ActivatedRoute, 
              public datePipe: DatePipe) { }

  get FORM_STATE() {
    return FORM_STATE;
  }

  ngOnInit(): void {
    this.onLoadExamPeriods();
  }

  refreshExamPeriodsPage(){
    this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
  }

  onLoadExamPeriods(){
    this.examPeriodsPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );

        let queryParams = {
          name: paramMap.get('name'),
          startDate: paramMap.get('startDate'),
          endDate: paramMap.get('endDate')
        };

        return this.examPeriodService.getExamPeriods(pageParams, queryParams);
      })
    );
  }

  examperiodFormDialogOpened: boolean = false;
  examperiodFormDialogOptions: ExamPeriodFormDialogOptions = {
    state: FORM_STATE.ADD,
    examPeriodForEdit: undefined,
    cancel: () => {},
    save: (examPeriod: ExamPeriod) => {},
  };

  onNewExamPeriodClick(): void {
    this.examperiodFormDialogOpened = true;

    this.examperiodFormDialogOptions = {
        state: FORM_STATE.ADD,
        examPeriodForEdit: undefined,
        cancel: () => { this.examperiodFormDialogOpened = false;},
        save: (examPeriod: ExamPeriod) => {
          this.examPeriodService.
          createExamPeriod(examPeriod).
          pipe(take(1)).
          subscribe((id) => {
          console.log('Exam period with id ' + id + ' is created!');
          this.examperiodFormDialogOpened = false;
          this.refreshExamPeriodsPage();
        });
        }
    };
  }

  onEditExamPeriodClick(examPeriod: ExamPeriod): void{
    this.examperiodFormDialogOpened = true;

    this.examperiodFormDialogOptions = {
      state: FORM_STATE.EDIT,
      examPeriodForEdit: examPeriod,
      cancel: () => { this.examperiodFormDialogOpened = false;},
      save: (examPeriod: ExamPeriod) => {
        this.examPeriodService.
        updateExamPeriod(examPeriod.id!, examPeriod).
        pipe(take(1)).
        subscribe(() => {
          console.log('Exam period updated: ' + examPeriod.id);
          this.examperiodFormDialogOpened = false;
          this.refreshExamPeriodsPage();
        });
      }
    }
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  onExamPeriodDelete(examPeriod: ExamPeriod): void{
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${examPeriod.name}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: ()=> {
        this.examPeriodService.
        deleteExamPeriod(examPeriod.id!).
        pipe(take(1)).
        subscribe(() => {
          this.confirmationDialogOpened = false;
          this.refreshExamPeriodsPage();
        });
      }
    };
  }

  onPageChange(selectedPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: selectedPage === 1 ? null : selectedPage },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { size: selectedPageSize },
      queryParamsHandling: 'merge',
    });
  }

  onSearchOptionsChange(queryParams: any): void {
    this.selectable ? (this.selectedEXamPeriod = undefined) : {};
    for (let key of Object.keys(queryParams)) {
      if (!queryParams[key]) queryParams[key] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
