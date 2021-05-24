import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FORM_STATE } from '../model/common/form-state';
import { ExamPeriod } from '../model/exam-period/exam-period';
import { ExamPeriodPage } from '../model/exam-period/exam-period-page';
import { PageParams } from '../model/http/page-params';
import { ExamPeriodService } from '../services/exam-period.service';

@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css'],
  providers: [DatePipe]
})
export class ExamPeriodsComponent implements OnInit {

  @Input('selectable') selectable: boolean = false;

  showSearchBox: boolean = false;
  examperiodFormDialogOpened: boolean = false;
  examPeriodFormDialogState: FORM_STATE = FORM_STATE.ADD;

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

  onLoadExamPeriods(){
    this.examPeriodsPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        let pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );
        return this.examPeriodService.getExamPeriods(pageParams);
      })
    );
  }
  
  openExamPeriodFormDialog(state: FORM_STATE){
    this.examPeriodFormDialogState = state;
    this.examperiodFormDialogOpened = true;
  }

  onExamPeriodDialogCancel(): void{
    this.examperiodFormDialogOpened = false;
    this.examPeriodForEdit = undefined;
  }

  onExamPeriodSave(examPeriod: ExamPeriod): void{
    this.examPeriodService.createExamPeriod(examPeriod).subscribe((result) => 
    console.log(result));
    this.examperiodFormDialogOpened = false;
    this.onLoadExamPeriods();
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
}
