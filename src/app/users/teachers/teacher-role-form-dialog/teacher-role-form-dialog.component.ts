import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FORM_STATE} from '../../../model/common/form-state';
import {TeacherRole} from '../../../model/teacher/teacher-role';
import {NgForm} from '@angular/forms';

export interface TeacherRoleFormDialogOptions {
  state: FORM_STATE;
  teacherRoleForEdit: TeacherRole | undefined;
  cancel: () => void;
  save: (teachingRole: TeacherRole) => void;
}

@Component({
  selector: 'teacher-role-form-dialog',
  templateUrl: './teacher-role-form-dialog.component.html',
  styleUrls: ['./teacher-role-form-dialog.component.css']
})
export class TeacherRoleFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherRoleFormDialogOptions;

  @ViewChild('frm') form!: NgForm;

  originalTeachingRoleName: string | undefined;

  teacherRole: TeacherRole = {
    name: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.teacherRoleForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.teacherRole = { ...this.options.teacherRoleForEdit };
      this.originalTeachingRoleName = this.options.teacherRoleForEdit.name;
    }
    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.teacherRole = {
            name: '',
        };
        this.originalTeachingRoleName = undefined;
      }, 3000);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.teacherRole);
    }
  }


}
