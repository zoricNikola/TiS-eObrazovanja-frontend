import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course/course';

@Component({
  selector: 'select-course-dialog',
  templateUrl: './select-course-dialog.component.html',
  styleUrls: ['./select-course-dialog.component.css']
})
export class SelectCourseDialogComponent implements OnInit {
  @Input('opened') opened: boolean = false;
  @Output('canceled') canceled: EventEmitter<void> = new EventEmitter();
  @Output('taken') taken: EventEmitter<Course> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
