import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Student } from './../../../model/student/student';
import { NgForm, NgModel } from '@angular/forms';

export interface StudentFormDialogOptions {
  state: FORM_STATE;
  studentForEdit: Student | undefined;
  cancel: () => void;
  save: (student: Student) => void;
}

@Component({
  selector: 'student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.css'],
})
export class StudentFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: StudentFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalStudentUsername: string | undefined;

  student: Student = {
    firstName: '',
    lastName: '',
    studentCard: '',
    address: '',
    generation: 0,
    dateOfBirth: new Date(),
    user: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.studentForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.student = {
        ...this.options.studentForEdit,
        user: { ...this.options.studentForEdit.user },
      };
      this.originalStudentUsername = this.options.studentForEdit.user.username;
    }

    if (changes.opened && changes.opened.firstChange)
      setTimeout(() => {
        this.form.resetForm();
      }, 10);

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.student = {
          firstName: '',
          lastName: '',
          studentCard: '',
          address: '',
          generation: 0,
          dateOfBirth: new Date(),
          user: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
          },
        };
        this.form.resetForm();
        this.originalStudentUsername = undefined;
      }, 300);
    }
  }

  ngOnInit(): void {}

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.student);
    }
  }

  validateUsername(usernameInput: NgModel) {}
}
