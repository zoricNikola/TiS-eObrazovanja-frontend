import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeacherTeachingCourseFormDialogOptions } from 'src/app/courses/course/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Course } from 'src/app/model/course/course';
import { CoursePage } from 'src/app/model/course/course-page';
import { TeacherRole } from 'src/app/model/teacher/teacher-role';
import { TeacherRolePage } from 'src/app/model/teacher/teacher-role-page';
import { Teaching } from 'src/app/model/teacher/teaching';
import { TeacherRoleService } from 'src/app/services/teacher-role.service';
import { SortParamsUtils } from 'src/app/services/utils/sort-params-utils.service';
import { TeacherRoleFormDialogOptions } from '../teacher-role-form-dialog/teacher-role-form-dialog.component';

@Component({
  selector: 'assign-course-to-teacher-form-dialog',
  templateUrl: './assign-course-to-teacher-form-dialog.component.html',
  styleUrls: ['./assign-course-to-teacher-form-dialog.component.css']
})
export class AssignCourseToTeacherFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;
  @Input('selectable') selectable = true;
  @Input('selectedCourse') selectedCourse : Course | undefined = undefined;

  coursesPage$: Observable<CoursePage> = of();
  
  @ViewChild('f') form!: NgForm;

  originalTeachingRole: TeacherRole | undefined;
  teacherNameAndSurname: string | undefined;

  showSearchBox = false;
  showCourses = false;

  teacherRoles$: Observable<TeacherRolePage> = of();
  selectedTeacherRole: TeacherRole | undefined;


  teacherRoleFormDialogOpened: boolean = false;
  teacherRoleFormDialogOptions: TeacherRoleFormDialogOptions = {
    state: FORM_STATE.ADD,
    teacherRoleForEdit: undefined,
    cancel: () => {},
    save: (teacherRole: TeacherRole) => {},
  };

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
              private teacherRoleService: TeacherRoleService) { }

  ngOnInit(): void {
    this.onLoadTeacherRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.teacherTeachingCourseForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.teaching = { ...this.options.teacherTeachingCourseForEdit };
      this.originalTeachingRole = this.options.teacherTeachingCourseForEdit.teacherRole;
      this.teacherNameAndSurname = this.options.teacherTeachingCourseForEdit.teacher?.firstName + ` ` +
        this.options.teacherTeachingCourseForEdit.teacher?.lastName;
    }
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onLoadTeacherRoles(): void {
    this.teacherRoles$ = this.teacherRoleService
      .getTeacherRoles()
      .pipe(take(1));
  }

  onCourseTaken(course: Course): void{
    this.selectedCourse = course;
    if (this.selectedCourse) {
      this.teaching.course = this.selectedCourse;
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.teaching.startDate = new Date();
      if (this.selectedTeacherRole ) {
        this.teaching.teacherRole = this.selectedTeacherRole;
      }
      this.options.save(this.teaching);
    }
  }

  onNewTeacherRoleClick(): void {
    this.teacherRoleFormDialogOpened = true;

    this.teacherRoleFormDialogOptions = {
      state: FORM_STATE.ADD,
      teacherRoleForEdit: undefined,
      cancel: () => {
        this.teacherRoleFormDialogOpened = false;
      },
      save: (teacherRole: TeacherRole) => {
        this.teacherRoleService
          .createTeacherRole(teacherRole)
          .pipe(take(1))
          .subscribe(() => {
            this.teacherRoleFormDialogOpened = false;
            this.teacherRoles$ = this.teacherRoleService.getTeacherRoles();
          });
      },
    }
  }
}
