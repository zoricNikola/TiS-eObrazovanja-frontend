import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from './../../../../model/student/student';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/model/course/course';

export interface StudentEnrollmentFormDialogOptions {
  student: Student;
  cancel: () => void;
  save: (enrollment: any) => void;
}

@Component({
  selector: 'enrollment-form-dialog',
  templateUrl: './student-enrollment-form-dialog.component.html',
  styleUrls: ['./student-enrollment-form-dialog.component.css']
})
export class StudentEnrollmentFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: StudentEnrollmentFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  enrollment: any = {
    course: {
      id: null,
      name: null
    }
  };

  selectCourseDialogOpened: boolean = false;

  onCourseSelected(course: Course): void {
    this.enrollment.course = {...course}; 
    this.selectCourseDialogOpened = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opened && !changes.opened.firstChange && !changes.opened.currentValue) {
      setTimeout(() => {
        this.form.resetForm();
        this.enrollment = {
          course: {
            id: null,
            name: null
          }
        };
      }, 300);
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.enrollment.course.id) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.enrollment);
    }
  }

}
