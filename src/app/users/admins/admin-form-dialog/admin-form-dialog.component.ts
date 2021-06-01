import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { User } from './../../../model/user/user';
import { NgForm, NgModel } from '@angular/forms';

export interface AdminFormDialogOptions {
  state: FORM_STATE;
  adminForEdit: User | undefined;
  cancel: () => void;
  save: (admin: User) => void;
}

@Component({
  selector: 'admin-form-dialog',
  templateUrl: './admin-form-dialog.component.html',
  styleUrls: ['./admin-form-dialog.component.css'],
})
export class AdminFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: AdminFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalAdminUsername: string | undefined;

  admin: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.adminForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.admin = { ...this.options.adminForEdit };
      this.originalAdminUsername = this.options.adminForEdit.username;
    }

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.admin = {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        };
        this.originalAdminUsername = undefined;
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
      this.options.save(this.admin);
    }
  }

  validateUsername(usernameInput: NgModel) {
    // console.log(this.form);
    // this.form.form.markAllAsTouched();
    // console.log(x.control.errors);
    // x.control.setErrors({ ...x.control.errors, usernameTaken: true });
  }
}
