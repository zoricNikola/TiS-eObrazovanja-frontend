import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Course} from '../../model/course/course';
import {FORM_STATE} from '../../model/common/form-state';

export interface CourseFormDialogOptions {
  state: FORM_STATE;
  courseForEdit: Course | undefined;
  cancel: () => void;
  save: (course: Course) => void;
}

@Component({
  selector: 'course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.css']
})
export class CourseFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened = false;
  @Input('options') options!: CourseFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalCourseName: string | undefined;

  course: Course = {
    name: ''
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.courseForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.course = { ...this.options.courseForEdit };
      this.originalCourseName = this.options.courseForEdit.name;
    }

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.course = {
          name: '',
        };
        this.originalCourseName = undefined;
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
      this.options.save(this.course);
    }
  }
}
