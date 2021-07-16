import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course/course';
import { Enrollment } from 'src/app/model/student/enrollment';

@Component({
  selector: 'select-course-enrollment-dialog',
  templateUrl: './select-course-enrollment-dialog.component.html',
  styleUrls: ['./select-course-enrollment-dialog.component.css'],
})
export class SelectCourseEnrollmentDialogComponent implements OnInit {
  @Input('opened') opened: boolean = false;
  @Input('courseX') course!: Course;
  @Output('canceled') canceled: EventEmitter<void> = new EventEmitter();
  @Output('taken') taken: EventEmitter<Enrollment> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
