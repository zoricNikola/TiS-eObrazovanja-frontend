import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/model/student/student';


@Component({
  selector: 'select-student-dialog',
  templateUrl: './select-student-dialog.component.html',
  styleUrls: ['./select-student-dialog.component.css']
})
export class SelectStudentDialogComponent implements OnInit {

  @Input('opened') opened: boolean = false;
  @Output('canceled') canceled: EventEmitter<void> = new EventEmitter();
  @Output('taken') taken: EventEmitter<Student> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
