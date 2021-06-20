import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TeacherTeachingCourseFormDialogOptions } from 'src/app/courses/assign-teacher-to-course-form-dialog/assign-teacher-to-course-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Course } from 'src/app/model/course/course';
import { CoursePage } from 'src/app/model/course/course-page';
import { TeacherRole } from 'src/app/model/teacher/teacher-role';

@Component({
  selector: 'assign-course-to-teacher-form-dialog',
  templateUrl: './assign-course-to-teacher-form-dialog.component.html',
  styleUrls: ['./assign-course-to-teacher-form-dialog.component.css']
})
export class AssignCourseToTeacherFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: TeacherTeachingCourseFormDialogOptions;
  @Input('selectable') selectable = true;

  selectedCourse: Course | undefined = undefined;

  coursesPage$: Observable<CoursePage> = of();
  
  @ViewChild('f') form!: NgForm;

  originalTeachingRole: TeacherRole | undefined;
  teacherNameAndSurname: string | undefined;

  showSearchBox = false;

  constructor() { }

  ngOnInit(): void {
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

}
