import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FORM_STATE} from '../../../model/common/form-state';
import {Exam} from '../../../model/exam/exam';
import {ExamPeriod} from '../../../model/exam-period/exam-period';
import {NgForm} from '@angular/forms';


export interface ExamFormDialogOptions {
  state: FORM_STATE;
  examForEdit: Exam | undefined;
  cancel: () => void;
  save: (exam: Exam) => void;
}

@Component({
  selector: 'exam-form-dialog',
  templateUrl: './exam-form-dialog.component.html',
  styleUrls: ['./exam-form-dialog.component.css']
})
export class ExamFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: ExamFormDialogOptions;
  @Input('selectable') selectable = false;
  @Input('selectedExamPeriod') selectedExamPeriod: ExamPeriod | undefined = undefined;

  @ViewChild('f') form!: NgForm;

  originalExamDateTime: Date | undefined;
  originalDescription: string | undefined;
  originalClassroom: string | undefined;
  originalPoints: number | undefined;
  originalExamPeriod: ExamPeriod | undefined;

  showExamPeriods = false;

  exam: Exam = {
    dateTime: new Date(),
    course: {
      name: '',
    },
    description: '',
    classroom: '',
    examPeriod: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.examForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.originalClassroom = this.options.examForEdit.classroom;
      this.originalDescription = this.options.examForEdit.description;
      this.originalExamPeriod = this.options.examForEdit.examPeriod;
      this.originalPoints = this.options.examForEdit.points;
      this.originalExamDateTime = this.options.examForEdit.dateTime;
      this.exam = { ...this.options.examForEdit };
    }
    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.exam = {
          dateTime: new Date(),
          course: {
            name: '',
          },
          description: '',
          classroom: '',
          examPeriod: {
            name: '',
            startDate: new Date(),
            endDate: new Date(),
          },
        };
        this.selectedExamPeriod = undefined;
      }, 3000);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  onExamPeriodTaken(examPeriod: ExamPeriod | undefined) {
    this.selectedExamPeriod = examPeriod;
    if (this.selectedExamPeriod) {
      this.exam.examPeriod = this.selectedExamPeriod;
    }
    this.showExamPeriods = false;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid){
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.exam);
    }
  }
}
