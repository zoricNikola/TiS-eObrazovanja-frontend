import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from '../services/courses.service';
import {Course} from '../model/course/course';
import {Observable, of} from 'rxjs';
import {CoursePage} from '../model/course/course-page';
import {FORM_STATE} from '../model/common/form-state';
import {switchMap} from 'rxjs/operators';
import {PageParams} from '../model/http/page-params';

@Component({
  selector: '[courses]',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @Input('selectable') selectable = false;
  @Output('itemTake') courseTake: EventEmitter<Course> = new EventEmitter<Course>();

  selectedCourse: Course | undefined = undefined;

  coursesPage$: Observable<CoursePage> = of ();

  showSearchBox = false;

  courseFormDialogOpened = false;
  courseFormDialogState: FORM_STATE = FORM_STATE.ADD;

  courseForEdit: Course | undefined = undefined;

  constructor(private router: Router,
              private courseService: CoursesService,
              private route: ActivatedRoute,
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
          sort: paramMap.getAll('sort')
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
      if (!queryParams[key]) { queryParams[key] = null; }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    const newSortParams = [...sortParams];
    if (newSortParams.includes(triggeredProperty)) {
      newSortParams.splice(newSortParams.indexOf(triggeredProperty), 1);
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},asc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},asc`),
        1
      );
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},ASC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},ASC`),
        1
      );
      newSortParams.push(`${triggeredProperty},DESC`);
    } else if (newSortParams.includes(`${triggeredProperty},desc`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},desc`),
        1
      );
    } else if (newSortParams.includes(`${triggeredProperty},DESC`)) {
      newSortParams.splice(
        newSortParams.indexOf(`${triggeredProperty},DESC`),
        1
      );
    } else {
      newSortParams.push(`${triggeredProperty},ASC`);
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSortParams },
      queryParamsHandling: 'merge',
    });
  }

  isSortASC(sortParams: string[], column: string): boolean {
    return (
      sortParams.includes(column) ||
      sortParams.includes(`${column},asc`) ||
      sortParams.includes(`${column},ASC`)
    );
  }

  isSortDESC(sortParams: string[], column: string): boolean {
    return (
      sortParams.includes(`${column},desc`) ||
      sortParams.includes(`${column},DESC`)
    );
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

  onCourseFormDialogCancel(): void {
    this.courseFormDialogOpened = false;
    this.courseForEdit = undefined;
  }

  onCourseSave(course: Course): void {
    this.courseService.createCourse(course).subscribe( );

    this.courseFormDialogOpened = false;
    this.courseForEdit = undefined;
  }

}
