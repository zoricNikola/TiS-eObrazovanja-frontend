import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Course} from '../../model/course/course';
import {FORM_STATE} from '../../model/common/form-state';

@Component({
  selector: 'course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.css']
})
export class CourseFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened = false;
  @Input('state') state!: FORM_STATE;
  @Input('course') inputCourse: Course | undefined;
  @Output('dialogCancel') dialogCancel: EventEmitter<void> = new EventEmitter();
  @Output('formSubmit') formSubmit: EventEmitter<Course> = new EventEmitter();

  originalCourseName: string | undefined;

  course: Course = {
    name: ''
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.inputCourse &&
      this.inputCourse &&
      this.state === FORM_STATE.EDIT
    ) {
      this.course = { ...this.inputCourse };
      this.originalCourseName = this.inputCourse?.name;
    }
  }

  ngOnInit(): void {

  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onDialogCancel(f: NgForm): void {
    this.dialogCancel.emit();
    setTimeout(() => {
      f.reset();
      this.originalCourseName = undefined;
    }, 300);
  }

  submit(f: NgForm) {
    this.formSubmit.emit(this.course);
  }
}
