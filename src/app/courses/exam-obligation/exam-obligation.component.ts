import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../model/course/course';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FORM_STATE} from '../../model/common/form-state';
import {ExamObligation} from '../../model/exam-obligation/exam-obligation';
import {ConfirmationDialogOptions} from '../../common/confirmation-dialog/confirmation-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamObligationService} from '../../services/exam-obligation.service';
import {CourseService} from '../../services/course.service';
import {SortParamsUtils} from '../../services/utils/sort-params-utils.service';
import {ExamObligationPage} from '../../model/exam-obligation/exam-obligation-page';
import {switchMap, take} from 'rxjs/operators';
import {PageParams} from '../../model/http/page-params';
import {ExamObligationDialogOptions} from './exam-obligation-form-dialog/exam-obligation-form-dialog.component';

@Component({
  selector: '[exam-obligation]',
  templateUrl: './exam-obligation.component.html',
  styleUrls: ['./exam-obligation.component.css']
})
export class ExamObligationComponent implements OnInit {
  @Input('selectable') selectable = false;
  @Input('courseId') courseId: number | undefined;
  @Output('itemTake') examObligationTake: EventEmitter<ExamObligation> = new EventEmitter<ExamObligation>();

  selectedExamObligation: ExamObligation | undefined = undefined;
  course!: Course;
  examObligationPage$: Observable<ExamObligationPage> = of();

  examObligationQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
    name: null
  });

  examObligationDialogOpened: boolean = false;
  examObligationDialogOptions: ExamObligationDialogOptions = {
    state: FORM_STATE.ADD,
    examObligationForEdit: undefined,
    cancel: () => {},
    save: (examObligation: ExamObligation) => {},
  };

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  showSearchBox: boolean = false;

  constructor(private router: Router,
              private examObligationService: ExamObligationService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              public sortParamUtils: SortParamsUtils) { }

  ngOnInit(): void {
    if (!this.selectable) {
      this.examObligationPage$ = this.route.queryParamMap.pipe(
        switchMap((paramMap) => {
          const pageParams: PageParams = new PageParams(
            paramMap.get('page'),
            paramMap.get('size')
          );

          const queryParams = {
            description: paramMap.get('points'),
            classroom: paramMap.get('description'),
            points: paramMap.get('examObligationType'),
            dateFrom: paramMap.get('course'),
            sort: paramMap.getAll('sort'),
          };
          return this.examObligationService.filterExamObligations(pageParams, this.courseId, queryParams);
        })
      );
    } else {
      this.examObligationPage$ = this.examObligationQueryMap.pipe(switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.size,
          paramMap.page
        );

        const queryParams = {
          sort: paramMap.sort,
          name: paramMap.name
        };
        return this.examObligationService.filterExamObligations(pageParams, this.courseId, queryParams);
      }));
    }
    this.courseService.getCourse(this.courseId).subscribe((course: Course) => this.course = course);
  }

  onPageChange(selectedPage: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: selectedPage === 1 ? null : selectedPage },
        queryParamsHandling: 'merge',
      });
    } else {
      this.examObligationQueryMap.next({
        ...this.examObligationQueryMap.value,
        page: selectedPage
      });
    }
  }

  onPageSizeChange(selectedPageSize: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { size: selectedPageSize },
        queryParamsHandling: 'merge',
      });
    } else {
      this.examObligationQueryMap.next({
        ...this.examObligationQueryMap.value,
        size: selectedPageSize
      });
    }
  }

  onSearchOptionsChange(queryParams: any): void {
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        queryParams[key] = null;
      }
    }

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    } else {
      this.examObligationQueryMap.next({
        ...this.examObligationQueryMap.value,
        ...queryParams
      });
    }
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedExamObligation = undefined) : {};
    let newSortParams = this.sortParamUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );

    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: newSortParams },
        queryParamsHandling: 'merge',
      });
    } else {
      this.examObligationQueryMap.next({
        ...this.examObligationQueryMap.value,
        sort: newSortParams
      });
    }
  }

  onExamObligationSelect(examObligation: ExamObligation): void {
    this.selectedExamObligation = this.selectedExamObligation === examObligation ? undefined : examObligation;
  }

  onExamObligationTake(): void {
    let examObligation: ExamObligation = {...this.selectedExamObligation as ExamObligation};
    this.selectedExamObligation = undefined;
    this.examObligationTake.emit(examObligation);
  }

  refreshExamObligationsPage(): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.examObligationQueryMap.next({
        ...this.examObligationQueryMap.value,
        r: 'r'
      });
    }
  }

  onNewExamObligationClick(): void{
      this.examObligationDialogOpened = true;

      this.examObligationDialogOptions = {
        state: FORM_STATE.ADD,
        examObligationForEdit: undefined,
        cancel: () => {
          this.examObligationDialogOpened = false;
        },
        save: (examObligation: ExamObligation) => {
          examObligation.course = this.course;
          this.examObligationService
            .createExamObligation(examObligation)
            .pipe(take(1))
            .subscribe(() => {
              this.examObligationDialogOpened = false;
              this.refreshExamObligationsPage();
            });
        }
      };
  }

  onEditExamObligationClick(examObligation: ExamObligation): void{
    this.examObligationDialogOpened = true;

    this.examObligationDialogOptions = {
      state: FORM_STATE.EDIT,
      examObligationForEdit: examObligation,
      cancel: () => {
        this.examObligationDialogOpened = false;
      },
      save: (examObligation: ExamObligation) => {
        examObligation.course = this.course;
        this.examObligationService
          .updateExamObligation(examObligation.id!, examObligation)
          .pipe(take(1))
          .subscribe(() => {
            this.examObligationDialogOpened = false;
            this.refreshExamObligationsPage();
          });
      }
    };
  }

  onDeleteExamObligationClick(examObligation: ExamObligation): void{
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${examObligation.description}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.examObligationService
          .deleteExamObligation(examObligation.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshExamObligationsPage();
          });
      }
    };
  }

}
