import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Enrollment } from 'src/app/model/student/enrollment';
import { ExamObligation } from './../../../../model/exam-obligation/exam-obligation';

export interface ExamObligationTakingFormDialogOptions {
  cancel: () => void;
  save: (taking: any) => void;
}

@Component({
  selector: 'exam-obligation-taking-form-dialog',
  templateUrl: './exam-obligation-taking-form-dialog.component.html',
  styleUrls: ['./exam-obligation-taking-form-dialog.component.css'],
})
export class ExamObligationTakingFormDialogComponent
  implements OnInit, OnChanges
{
  @Input('opened') opened: boolean = false;
  @Input('options') options!: ExamObligationTakingFormDialogOptions;
  @Input('examObligation') obligation!: ExamObligation;

  @ViewChild('f') form!: NgForm;

  taking: any = {
    score: null,
    enrollment: {
      id: null,
      student: {
        studentCard: null,
      },
    },
  };

  selectEnrollmentDialogOpened: boolean = false;

  onEnrollmentSelected(enrollment: Enrollment): void {
    this.taking.enrollment = {
      ...enrollment,
      student: { ...enrollment.student },
    };
    this.selectEnrollmentDialogOpened = false;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {
      setTimeout(() => {
        this.form.resetForm();
        this.taking = {
          score: null,
          enrollment: {
            id: null,
            student: {
              studentCard: null,
            },
          },
        };
      }, 300);
    }
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.taking.enrollment.id) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.taking);
    }
  }
}
