import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course/course';
import { AsyncSubject, Observable, of } from 'rxjs';
import { CoursePage } from '../model/course/course-page';
import { FORM_STATE } from '../model/common/form-state';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from '../model/http/page-params';
import { SortParamsUtils } from '../services/utils/sort-params-utils.service';

@Component({
  selector: '[courses]',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @Input('selectable') selectable = false;
  @Output('itemTake') courseTake: EventEmitter<Course> =
    new EventEmitter<Course>();

  selectedCourse: Course | undefined = undefined;

  coursesPage$: Observable<CoursePage> = of();

  showSearchBox = false;

  courseFormDialogOpened = false;
  courseFormDialogState: FORM_STATE = FORM_STATE.ADD;

  courseForEdit: Course | undefined = undefined;

  constructor(
    private router: Router,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    public sortParamUtils: SortParamsUtils
  ) {}

  ngOnInit(): void {
    this.coursesPage$ = this.route.queryParamMap.pipe(
      switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.get('page'),
          paramMap.get('size')
        );

        const queryParams = {
          name: paramMap.get('name'),
          sort: paramMap.getAll('sort'),
        };
        return this.courseService.getCourses(pageParams, queryParams);
      })
    );
  }

  get FORM_STATE() {
    return FORM_STATE;
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
    this.selectable ? (this.selectedCourse = undefined) : {};
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

  onCourseSelect(course: Course): void {
    this.selectedCourse = this.selectedCourse === course ? undefined : course;
  }

  onCourseTake(): void {
    this.courseTake.emit(this.selectedCourse);
  }

  openCourseFormDialog(state: FORM_STATE): void {
    this.courseFormDialogState = state;
    this.courseFormDialogOpened = true;
  }

  closeCourseFormDialog(): void {
    this.courseFormDialogOpened = false;
    this.courseForEdit = undefined;
  }

  onCourseFormDialogCancel(): void {
    this.closeCourseFormDialog();
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

  onCourseSave(course: Course): void {
    if (!course.id)
      this.courseService
        .createCourse(course)
        .pipe(take(1))
        .subscribe((id) => {
          console.log(id);
          this.closeCourseFormDialog();
          this.refreshCoursesPage();
        });
    else
      this.courseService
        .updateCourse(course.id, course)
        .pipe(take(1))
        .subscribe(() => {
          console.log('Updated ', course.id);
          this.closeCourseFormDialog();
          this.refreshCoursesPage();
        });
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialog$!: AsyncSubject<boolean>;

  dialogOptions = {
    opened: false,
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  onCourseDelete(course: Course): void {
    this.confirmationDialog$ = new AsyncSubject();

    this.dialogOptions = {
      opened: true,
      title: '',
      message: '',
      decline: () => {
        this.dialogOptions.opened = false;
      },
      confirm: () => {
        // console.log('Confirmed deleting ', course.id);
        this.dialogOptions.opened = false;
      },
    };

    this.confirmationDialog$.subscribe((result) => {
      if (result && course.id)
        this.courseService
          .deleteCourse(course.id)
          .pipe(take(1))
          .subscribe(() => {
            setTimeout(() => {
              // console.log('Deleted ', course.id);
              this.confirmationDialogOpened = false;
              this.refreshCoursesPage();
            }, 1000);
          });
      else this.confirmationDialogOpened = false;
    });
  }
}
