import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ExamPeriod } from 'src/app/model/exam-period';

@Component({
  selector: 'app-exam-period-form-dialog',
  templateUrl: './exam-period-form-dialog.component.html',
  styleUrls: ['./exam-period-form-dialog.component.css']
})
export class ExamPeriodFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('state') state!: FORM_STATE;
  @Input('admin') inputExamPeriod: ExamPeriod | undefined;
  @Output('dialogCancel') dialogCancel: EventEmitter<void> = new EventEmitter();
  @Output('formSubmit') formSubmit: EventEmitter<ExamPeriod> = new EventEmitter();


  examPeriod: ExamPeriod = {
    _id: 0,
    startDate: new Date,
    endDate: new Date,
    name: ''
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void{
    if (
      changes.inputExamPeriod &&
      this.inputExamPeriod &&
      this.state === FORM_STATE.EDIT
    ) {
      this.examPeriod = this.inputExamPeriod;
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
    }, 300);
  }

  submit(f: NgForm) {
    this.formSubmit.emit(this.examPeriod);
  }

}
