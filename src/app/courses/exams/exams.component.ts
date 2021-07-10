import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exam} from '../../model/exam/exam';
import {Observable, of} from 'rxjs';
import {ExamPage} from '../../model/exam/exam-page';
import {ConfirmationDialogOptions} from '../../common/confirmation-dialog/confirmation-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamsService} from '../../services/exams.service';
import {SortParamsUtils} from '../../services/utils/sort-params-utils.service';
import {switchMap} from 'rxjs/operators';
import {PageParams} from '../../model/http/page-params';
import {DatePipe} from '@angular/common';

@Component({
  selector: '[exams]',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  @Input('selectable') selectable = true;
  @Input('courseId') courseId: number | undefined;
  @Output('itemTake') examTake: EventEmitter<Exam> = new EventEmitter<Exam>();

  selectedExam: Exam | undefined = undefined;

  examsPage$: Observable<ExamPage> = of();

  showSearchBox = false;

  // examFormDialogOpened: boolean = false;
  // examFormDialogOptions: ExamFormDialogOptions = {
  //   state: FORM_STATE.ADD,
  //   examForEdit: undefined,
  //   cancel: () => {},
  //   save: (exam: Exam) => {},
  // };

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
      title: '',
      message: '',
      decline: () => {},
      confirm: () => {},
  };

  constructor(private router: Router,
              private examService: ExamsService,
              private route: ActivatedRoute,
              public sortParamUtils: SortParamsUtils) { }

  ngOnInit(): void {
    this.examsPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );

        const queryParams = {
          courseName: paramMap.get('courseName'),
          description: paramMap.get('description'),
          classroom: paramMap.get('classroom'),
          points: paramMap.get('points'),
          examPeriodName: paramMap.get('examPeriod'),
          dateFrom: paramMap.get('dateFrom'),
          dateTo: paramMap.get('dateTo'),
          sort: paramMap.getAll('sort'),
        };
        return this.examService.filterCourseExams(pageParams, queryParams, this.courseId);
      })
    );
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
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        queryParams[key] = null;
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedExam = undefined) : {};
    let newSortParams = this.sortParamUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
  }

  onExamSelect(exam: Exam): void {
    this.selectedExam = this.selectedExam === exam ? undefined : exam;
  }

  onExamTake(): void {
    this.examTake.emit(this.selectedExam);
  }

  refreshCoursesPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
      },
      queryParamsHandling: 'merge',
    });
  }

}
