import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ExamObligationType} from '../../model/exam-obligation/exam-obligation-type';
import {FORM_STATE} from '../../model/common/form-state';

export interface ExamObligationTypeDialogOptions  {
  state: FORM_STATE;
  examObligationTypeForEdit: ExamObligationType | undefined;
  cancel: () => void;
  save: (examObligationType: ExamObligationType) => void;
}

@Component({
  selector: 'app-exam-obligation-type',
  templateUrl: './exam-obligation-type.component.html',
  styleUrls: ['./exam-obligation-type.component.css']
})
export class ExamObligationTypeComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: ExamObligationTypeDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalExamObligationTypeName: string | undefined;

  examObligationType: ExamObligationType = {
    name: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.options &&
      this.options.examObligationTypeForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.examObligationType = {...this.options.examObligationTypeForEdit};
      this.originalExamObligationTypeName = this.options.examObligationTypeForEdit.name;
    }
    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {

    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  resetForm(): void{
    setTimeout(() => {
      this.form.resetForm();
      this.examObligationType = {
        name: '',
      };
      this.originalExamObligationTypeName = undefined;
    }, 3000);
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.examObligationType);
    }
    this.resetForm();
  }
}
