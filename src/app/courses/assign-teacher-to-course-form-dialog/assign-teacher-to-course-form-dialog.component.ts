import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Teacher} from '../../model/teacher/teacher';
import {TeacherRole} from '../../model/teacher/teacher-role';
import {FORM_STATE} from '../../model/common/form-state';
import {Teachings} from '../../model/teacher/teachings';
import {TeacherTitle} from '../../model/teacher/teacher-title';
import {User} from '../../model/user/user';
import {TeachersService} from '../../services/teachers.service';
import {Observable, of} from 'rxjs';

export interface TeacherTeachingCourseFormDialogOptions {
  state: FORM_STATE;
  teacherTeachingCourseForEdit: Teachings | undefined;
  cancel: () => void;
  save: (teachings: Teachings) => void;
}

@Component({
  selector: 'assign-teacher-to-course-form-dialog',
  templateUrl: './assign-teacher-to-course-form-dialog.component.html',
  styleUrls: ['./assign-teacher-to-course-form-dialog.component.css']
})
export class AssignTeacherToCourseFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalTeachingRole: TeacherRole | undefined;

  teacherTitle: TeacherTitle = {
    id: 0,
    name: '',
  };

  teacherRole: TeacherRole = {
    id: 0,
    name: '',
  };

  user: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  teacher: Teacher = {
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: new Date(),
    teacherTitle: this.teacherTitle,
    user: this.user,
  };

  teaching: Teachings = {
    startDate: new Date(),
    teacher: this.teacher,
    teacherRole: this.teacherRole,
  };

  teachers$: Observable<Teacher[]> = this.teacherService.getTeachers();
  teacherRoles$: Observable<TeacherRole[]> = of([
    {id: 1, name:'Assistant'},
    {id: 2, name:'Profesor'}
  ]);

  constructor(private teacherService: TeachersService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.teacherTeachingCourseForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.teaching = { ...this.options.teacherTeachingCourseForEdit };
      this.originalTeachingRole = this.options.teacherTeachingCourseForEdit.teacherRole;
    }

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.teaching = {
           startDate: new Date(),
           teacher: this.teacher,
          teacherRole: this.teacherRole,
        };
        this.originalTeachingRole = undefined;
      }, 300);
    }
  }
  ngOnInit(): void {
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.teaching);
    }
  }
}
