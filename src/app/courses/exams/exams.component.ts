import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exam} from '../../model/exam/exam';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ExamPage} from '../../model/exam/exam-page';
import {ConfirmationDialogOptions} from '../../common/confirmation-dialog/confirmation-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamsService} from '../../services/exams.service';
import {SortParamsUtils} from '../../services/utils/sort-params-utils.service';
import {switchMap, take} from 'rxjs/operators';
import {PageParams} from '../../model/http/page-params';
import {FORM_STATE} from '../../model/common/form-state';
import {ExamFormDialogOptions} from './exam-form-dialog/exam-form-dialog.component';
import {CourseService} from '../../services/course.service';
import {Course} from '../../model/course/course';

@Component({
  selector: '[exams]',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  @Input('selectable') selectable = false;
  @Input('courseId') courseId: number | undefined;
  @Output('itemTake') examTake: EventEmitter<Exam> = new EventEmitter<Exam>();

  selectedExam: Exam | undefined = undefined;
  course!: Course;

  examQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
    name: null
  });

  examsPage$: Observable<ExamPage> = of();

  showSearchBox = false;

  examFormDialogOpened: boolean = false;
  examFormDialogOptions: ExamFormDialogOptions = {
    state: FORM_STATE.ADD,
    examForEdit: undefined,
    cancel: () => {},
    save: (exam: Exam) => {},
  };

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
      title: '',
      message: '',
      decline: () => {},
      confirm: () => {},
  };

  constructor(private router: Router,
              private examService: ExamsService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              public sortParamUtils: SortParamsUtils) { }

  ngOnInit(): void {
    if (!this.selectable) {
      this.examsPage$ = this.route.queryParamMap.pipe(
        switchMap((paramMap) => {
          const pageParams: PageParams = new PageParams(
            paramMap.get('page'),
            paramMap.get('size')
          );

          const queryParams = {
            description: paramMap.get('description'),
            classroom: paramMap.get('classroom'),
            points: paramMap.get('points'),
            dateFrom: paramMap.get('startDate'),
            dateTo: paramMap.get('endDate'),
            sort: paramMap.getAll('sort'),
          };
          return this.examService.filterCourseExams(pageParams, queryParams, this.courseId);
        })
      );
    } else {
      this.examsPage$ = this.examQueryMap.pipe(switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
          name: paramMap.name
        };

        return this.examService.filterCourseExams(pageParams, queryParams, this.courseId);
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
      this.examQueryMap.next({
        ...this.examQueryMap.value,
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
      this.examQueryMap.next({
        ...this.examQueryMap.value,
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
      this.examQueryMap.next({
        ...this.examQueryMap.value,
        ...queryParams
      });
    }
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedExam = undefined) : {};
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
      this.examQueryMap.next({
        ...this.examQueryMap.value,
        sort: newSortParams
      });
    }
  }

  onExamSelect(exam: Exam): void {
    this.selectedExam = this.selectedExam === exam ? undefined : exam;
  }

  onExamTake(): void {
    let exam: Exam = {...this.selectedExam as Exam};
    this.selectedExam = undefined;
    this.examTake.emit(exam);
  }

  refreshExamsPage(): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.examQueryMap.next({
        ...this.examQueryMap.value,
        r: 'r'
      });
    }
  }

  onNewExamClick(): void {
    this.examFormDialogOpened = true;
    this.examFormDialogOptions = {
      state: FORM_STATE.ADD,
      examForEdit: undefined,
      cancel: () => {
        this.examFormDialogOpened = false;
      },
      save: (exam: Exam) => {
        exam.course = this.course;
        this.examService
          .saveExam(exam)
          .pipe(take(1))
          .subscribe(() => {
            this.examFormDialogOpened = false;
            this.refreshExamsPage();
          });
      }
    };
  }

  onEditExamClick(exam: Exam): void{
    this.examFormDialogOpened = true;

    this.examFormDialogOptions = {
      state: FORM_STATE.EDIT,
      examForEdit: exam,
      cancel: () => {
        this.examFormDialogOpened = false;
      },
      save: (exam: Exam) => {
        exam.course = this.course;
        this.examService
          .updateExam(exam.id!, exam)
          .pipe(take(1))
          .subscribe(() => {
            this.examFormDialogOpened = false;
            this.refreshExamsPage();
          });
      }
    };
  }

  onDeleteExamClick(exam: Exam): void {
    this.confirmationDialogOpened = true;
    this.confirmationDialogOptions = {
      title: `Delete ${this.course.name} from ${exam.examPeriod.name}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.examService
          .deleteExam(exam.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshExamsPage();
          });
      }
    };
  }


}
