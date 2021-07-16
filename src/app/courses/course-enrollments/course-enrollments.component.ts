import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Course } from 'src/app/model/course/course';
import { PageParams } from 'src/app/model/http/page-params';
import { Enrollment } from 'src/app/model/student/enrollment';
import { EnrollmentPage } from 'src/app/model/student/enrollment-page';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { SortParamsUtils } from 'src/app/services/utils/sort-params-utils.service';
import { CourseEnrollmentFormDialogOptions } from './course-enrollment-form-dialog/course-enrollment-form-dialog.component';

@Component({
  selector: '[course-enrollments]',
  templateUrl: './course-enrollments.component.html',
  styleUrls: ['./course-enrollments.component.css'],
})
export class CourseEnrollmentsComponent implements OnInit {
  @Input('courseX') course!: Course;
  @Input('selectable') selectable = false;
  @Output('itemTake') enrollmentTake: EventEmitter<Enrollment> =
    new EventEmitter();

  selectedEnrollment: Enrollment | undefined = undefined;

  enrollmentsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
  });
  enrollmentsPage$: Observable<EnrollmentPage> = of();

  constructor(
    private enrollmentService: EnrollmentService,
    private coursesService: CoursesService,
    public sortParamsUtils: SortParamsUtils,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.enrollmentsPage$ = this.enrollmentsQueryMap.pipe(
      switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
        };

        return this.coursesService.filterEnrollments(
          this.course.id!,
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

    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      sort: newSortParams,
    });
  }

  onPageChange(selectedPage: number): void {
    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      page: selectedPage,
    });
  }

  onPageSizeChange(selectedPageSize: number): void {
    this.enrollmentsQueryMap.next({
      ...this.enrollmentsQueryMap.value,
      size: selectedPageSize,
    });
  }

  enrollmentFormDialogOpened: boolean = false;
  enrollmentFormDialogOptions: CourseEnrollmentFormDialogOptions = {
    course: this.course,
    cancel: () => {},
    save: (enrollment: any) => {},
  };

  onNewEnrollmentClick(): void {
    this.enrollmentFormDialogOpened = true;

    this.enrollmentFormDialogOptions = {
      course: this.course,
      cancel: () => (this.enrollmentFormDialogOpened = false),
      save: (enrollment: any) => {
        this.enrollmentService
          .createEnrollment({ ...enrollment, course: this.course })
          .pipe(take(1))
          .subscribe((id) => {
            this.enrollmentFormDialogOpened = false;

            this.enrollmentsQueryMap.next({
              ...this.enrollmentsQueryMap.value,
              r: 'r',
            });
          });
      },
    };
  }

  onEnrollmentSelect(enrollment: Enrollment): void {
    this.selectedEnrollment =
      this.selectedEnrollment === enrollment ? undefined : enrollment;
  }

  onEnrollmentTake(): void {
    let enrollment: Enrollment = {
      ...this.selectedEnrollment,
      student: { ...this.selectedEnrollment?.student! },
    };
    this.selectedEnrollment = undefined;
    this.enrollmentTake.emit(enrollment);
  }
}
