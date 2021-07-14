import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from '../services/courses.service';
import {Course} from '../model/course/course';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {CoursePage} from '../model/course/course-page';
import {FORM_STATE} from '../model/common/form-state';
import {switchMap, take} from 'rxjs/operators';
import {PageParams} from '../model/http/page-params';
import {SortParamsUtils} from '../services/utils/sort-params-utils.service';
import {CourseFormDialogOptions} from './course-form-dialog/course-form-dialog.component';
import {ConfirmationDialogOptions} from '../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: '[courses]',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @Input('selectable') selectable = false;
  @Output('itemTake') courseTake: EventEmitter<Course> = new EventEmitter<Course>();

  selectedCourse: Course | undefined = undefined;

  coursesQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: null,
    size: null,
    sort: [],
    name: null
  })

  coursesPage$: Observable<CoursePage> = of();

  showSearchBox = false;

  courseFormDialogOpened: boolean = false;
  courseFormDialogOptions: CourseFormDialogOptions = {
    state: FORM_STATE.ADD,
    courseForEdit: undefined,
    cancel: () => {},
    save: (course: Course) => {},
  };

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  constructor(
    private router: Router,
    private courseService: CoursesService,
    private route: ActivatedRoute,
    public sortParamUtils: SortParamsUtils
  ) {}

  ngOnInit(): void {
    if (!this.selectable) {
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
          return this.courseService.filterCourses(pageParams, queryParams);
        })
      );
    } else {
      this.coursesPage$ = this.coursesQueryMap.pipe(switchMap((paramMap) => {
        const pageParams: PageParams = new PageParams(
          paramMap.page,
          paramMap.size
        );

        const queryParams = {
          sort: paramMap.sort,
          name: paramMap.name
        };

        return this.courseService.filterCourses(pageParams, queryParams);
      }))
    }
  }

  onPageChange(selectedPage: number): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: selectedPage === 1 ? null : selectedPage },
        queryParamsHandling: 'merge',
      });
    } else {
      this.coursesQueryMap.next({
        ...this.coursesQueryMap.value,
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
      this.coursesQueryMap.next({
        ...this.coursesQueryMap.value,
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
      this.coursesQueryMap.next({
        ...this.coursesQueryMap.value,
        ...queryParams
      });
    }
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    this.selectable ? (this.selectedCourse = undefined) : {};
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
      this.coursesQueryMap.next({
        ...this.coursesQueryMap.value,
        sort: newSortParams
      });
    }
  }

  onCourseSelect(course: Course): void {
    this.selectedCourse = this.selectedCourse === course ? undefined : course;
  }

  onCourseTake(): void {
    let course: Course = {...this.selectedCourse as Course};
    this.selectedCourse = undefined;
    this.courseTake.emit(course);
  }

  refreshCoursesPage(): void {
    if (!this.selectable) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          r: this.route.snapshot.queryParamMap.get('r') ? null : 'r',
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.coursesQueryMap.next({
        ...this.coursesQueryMap.value,
        r: 'r'
      });
    }
  }

  onNewCourseClick(): void {
    this.courseFormDialogOpened = true;

    this.courseFormDialogOptions = {
      state: FORM_STATE.ADD,
      courseForEdit: undefined,
      cancel: () => {
        this.courseFormDialogOpened = false;
      },
      save: (course: Course) => {
        this.courseService.createCourse(course)
          .pipe(take(1))
          .subscribe((id) => {
            this.courseFormDialogOpened = false;
            this.refreshCoursesPage();
          });
      }
    };
  }

  onEditCourseClick(course: Course): void {
    this.courseFormDialogOpened = true;

    this.courseFormDialogOptions = {
      state: FORM_STATE.EDIT,
      courseForEdit: course,
      cancel: () => {
        this.courseFormDialogOpened = false;
      },
      save: (course: Course) => {
        this.courseService.updateCourse(course.id!, course)
          .pipe(take(1))
          .subscribe(() => {
            this.courseFormDialogOpened = false;
            this.refreshCoursesPage();
          });
      }
    };
  }

  onCourseDelete(course: Course): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete ${course.name}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.courseService.deleteCourse(course.id!)
          .pipe(take(1))
          .subscribe(() => {
            this.confirmationDialogOpened = false;
            this.refreshCoursesPage();
          });
      }
    };
  }

}
