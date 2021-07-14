import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Teacher} from '../../../model/teacher/teacher';
import {TeacherRole} from '../../../model/teacher/teacher-role';
import {FORM_STATE} from '../../../model/common/form-state';
import {Teaching} from '../../../model/teacher/teaching';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';
import {TeachingService} from '../../../services/teaching.service';
import {TeacherRoleService} from '../../../services/teacher-role.service';
import {TeacherRolePage} from '../../../model/teacher/teacher-role-page';
import {TeacherRoleFormDialogOptions} from '../../../users/teachers/teacher-role-form-dialog/teacher-role-form-dialog.component';

export interface TeacherTeachingCourseFormDialogOptions {
  state: FORM_STATE;
  teacherTeachingCourseForEdit: Teaching | undefined;
  cancel: () => void;
  save: (teaching: Teaching) => void;
}

@Component({
  selector: 'assign-teacher-to-course-form-dialog',
  templateUrl: './assign-teacher-to-course-form-dialog.component.html',
  styleUrls: ['./assign-teacher-to-course-form-dialog.component.css']
})
export class AssignTeacherToCourseFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;
  @Input('selectable') selectable = true;
  @Input('selectedTeacher') selectedTeacher: Teacher | undefined = undefined;

  @ViewChild('f') form!: NgForm;

  originalTeachingRole: TeacherRole | undefined;
  teacherNameAndSurname: string | undefined;

  showSearchBox = false;
  showTeachers = false;

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
      name: '',
    },
  };

  teacherRoles$: Observable<TeacherRolePage> = of();
  selectedTeacherRole: TeacherRole | undefined;

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

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {

    }
  }

  constructor(private teachingsService: TeachingService,
              private teacherRoleService: TeacherRoleService) { }

  ngOnInit(): void {
    this.onLoadTeacherRoles();
  }

  resetForm(): void {
    setTimeout(() => {
      this.form.resetForm();
      this.teaching = {
        startDate: new Date(),
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
          name: '',
        },
      };
      this.originalTeachingRole = undefined;
      this.selectedTeacher = undefined;
      this.selectedTeacherRole = undefined;
    }, 3000);
  }

  onLoadTeacherRoles(): void {
    this.teacherRoles$ = this.teacherRoleService
      .getTeacherRoles()
      .pipe(take(1));
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onTeacherTaken(teacher: Teacher | undefined) {
    this.selectedTeacher = teacher;
    if (this.selectedTeacher) {
      this.teaching.teacher = this.selectedTeacher;
    }
    this.showTeachers = false;
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
      this.resetForm();
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
    };
  }
}
