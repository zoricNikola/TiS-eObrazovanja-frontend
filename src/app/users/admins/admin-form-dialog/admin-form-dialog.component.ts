import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { User } from './../../../model/user/user';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'admin-form-dialog',
  templateUrl: './admin-form-dialog.component.html',
  styleUrls: ['./admin-form-dialog.component.css'],
})
export class AdminFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('state') state!: FORM_STATE;
  @Input('admin') inputAdmin: User | undefined;
  @Output('dialogCancel') dialogCancel: EventEmitter<void> = new EventEmitter();
  @Output('formSubmit') formSubmit: EventEmitter<User> = new EventEmitter();

  @ViewChild('f') form!: NgForm;

  originalAdminUsername: string | undefined;

  admin: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.inputAdmin &&
      this.inputAdmin &&
      this.state === FORM_STATE.EDIT
    ) {
      this.admin = { ...this.inputAdmin };
      this.originalAdminUsername = this.inputAdmin?.username;
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

  onDialogCancel(): void {
    this.dialogCancel.emit();
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.formSubmit.emit(this.admin);
    }
  }

  validateUsername(usernameInput: NgModel) {
    // console.log(this.form);
    // this.form.form.markAllAsTouched();
    // console.log(x.control.errors);
    // x.control.setErrors({ ...x.control.errors, usernameTaken: true });
  }
}
