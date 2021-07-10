import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeacherTeachingCourseFormDialogOptions } from 'src/app/courses/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Course } from 'src/app/model/course/course';
import { CoursePage } from 'src/app/model/course/course-page';
import { PageParams } from 'src/app/model/http/page-params';
import { TeacherRole } from 'src/app/model/teacher/teacher-role';
import { Teaching } from 'src/app/model/teacher/teaching';
import { CoursesService } from 'src/app/services/courses.service';
import { SortParamsUtils } from 'src/app/services/utils/sort-params-utils.service';

@Component({
  selector: 'assign-course-to-teacher-form-dialog',
  templateUrl: './assign-course-to-teacher-form-dialog.component.html',
  styleUrls: ['./assign-course-to-teacher-form-dialog.component.css']
})
export class AssignCourseToTeacherFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;
  @Input('selectable') selectable = true;

  selectedCourse: Course | undefined = undefined;

  coursesPage$: Observable<CoursePage> = of();
  
  @ViewChild('f') form!: NgForm;

  originalTeachingRole: TeacherRole | undefined;
  teacherNameAndSurname: string | undefined;

  showSearchBox = false;

  teaching: Teaching = {
    startDate: new Date(''),
    teacher: {
      firstName: '',
      lastName: '',
      address: '',
      dateOfBirth: new Date(''),
      teacherTitle: {
        id: 0,
        name: '',
      },
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
    },
    teacherRole: {
      id: 0,
      name: '',
    },
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              public sortParamUtils: SortParamsUtils,
              private courseService: CoursesService) { }

  ngOnInit(): void {
    this.onLoadCourses();
  }

  onLoadCourses(): void {
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
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onSearchOptionsChange(queryParamsValue: any): void {
    // for (const key of Object.keys(queryParams)) {
    //   if (!queryParams[key]) {
    //     queryParams[key] = null;
    //   }
    // }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams : {
        name: queryParamsValue
      },
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

  onCourseSelect(course: Course): void{
    this.selectedCourse = this.selectedCourse === course ? undefined : course;
    if (this.selectedCourse) {
      this.teaching.course = this.selectedCourse;
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.teaching.startDate = new Date();
      this.options.save(this.teaching);
    }
  }

}
