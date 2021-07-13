import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { Course } from 'src/app/model/course/course';
import { Exam } from 'src/app/model/exam/exam';

export interface ExamFormDialogOptions{
  state: FORM_STATE,
  examForEdit: Exam | undefined,
  cancel: () => void;
  save: (exam: Exam) => void;
}

@Component({
  selector: 'create-exam-form-dialog',
  templateUrl: './exam-form-dialog.component.html',
  styleUrls: ['./exam-form-dialog.component.css']
})
export class ExamFormDialogComponent implements OnInit, OnChanges {

  @Input('opened') opened = false;
  @Input('options') options!: ExamFormDialogOptions;
  @Input('selectedCourse') selectedCourse: Course | undefined = undefined;

  @ViewChild('f') form!: NgForm;

  courseName: string | undefined;
  examPeriodName: string | undefined;

  exam: Exam = {
    id: 0,
    dateTime: new Date(''),
    course: {
      name: ''
    },
    description: '',
    classroom: '',
    points: 0,
    examPeriod: {
      id: 0,
      name: '',
      startDate: new Date(''),
      endDate: new Date('')
    }
  };


  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.examForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.exam = { 
        ...this.options.examForEdit,
        course: {...this.options.examForEdit.course},
        examPeriod: {...this.options.examForEdit.examPeriod}
       };
      this.courseName = this.options.examForEdit.course?.name;
      this.examPeriodName = this.options.examForEdit.examPeriod?.name;
    }

    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.exam = {
          id: 0,
          dateTime: new Date(''),
          course: {
            name: ''
          },
          description: '',
          classroom: '',
          points: 0,
          examPeriod: {
            id: 0,
            name: '',
            startDate: new Date(''),
            endDate: new Date('')
          }
        };
        this.courseName = undefined;
        this.examPeriodName = undefined;
      }, 300);
    }
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onCourseTaken(course: Course | undefined): void {
    this.selectedCourse = course;
    if(this.selectedCourse){
      this.exam.course = this.selectedCourse;
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.exam);
    }
  }

}
