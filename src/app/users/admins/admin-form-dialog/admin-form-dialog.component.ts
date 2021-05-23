import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { User } from './../../../model/user/user';
import { NgForm } from '@angular/forms';

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
      changes.inputAdmin &&
      this.inputAdmin &&
      this.state === FORM_STATE.EDIT
    ) {
      this.admin = { ...this.inputAdmin };
      this.originalAdminUsername = this.inputAdmin?.username;
    }
  }

  ngOnInit(): void {}

  get FORM_STATE() {
    return FORM_STATE;
  }

  onDialogCancel(f: NgForm): void {
    this.dialogCancel.emit();
    setTimeout(() => {
      f.reset();
      this.originalAdminUsername = undefined;
    }, 300);
  }

  submit(f: NgForm) {
    this.formSubmit.emit(this.admin);
  }
}
