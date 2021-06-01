import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ExamPeriod } from 'src/app/model/exam-period/exam-period';

export interface ExamPeriodFormDialogOptions{
  state: FORM_STATE;
  examPeriodForEdit: ExamPeriod | undefined;
  cancel: () => void;
  save: (examPeriod: ExamPeriod) => void;
}

@Component({
  selector: 'app-exam-period-form-dialog',
  templateUrl: './exam-period-form-dialog.component.html',
  styleUrls: ['./exam-period-form-dialog.component.css']
})
export class ExamPeriodFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: ExamPeriodFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  examPeriod: ExamPeriod = {
    startDate: new Date(''),
    endDate: new Date(''),
    name: ''
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.options &&
      this.options.examPeriodForEdit &&
      this.options.state === FORM_STATE.EDIT){
        this.examPeriod = {...this.options.examPeriodForEdit};
      }

    if(changes.opened &&
        !changes.opened.firstChange &&
        !changes.opened.currentValue) {
        setTimeout(() => {
          this.form.resetForm();
          this.examPeriod = {
            startDate: new Date(''),
            endDate: new Date(''),
            name: '' };
        }, 300);
      } 
  }

  ngOnInit(): void {
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.examPeriod);
    }
  }

}
