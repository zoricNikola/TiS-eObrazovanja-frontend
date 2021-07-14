import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FORM_STATE} from '../../../model/common/form-state';
import {ExamObligation} from '../../../model/exam-obligation/exam-obligation';
import {NgForm} from '@angular/forms';
import {ExamObligationType} from '../../../model/exam-obligation/exam-obligation-type';
import {ExamObligationTypeService} from '../../../services/exam-obligation-type.service';
import {Observable, of} from 'rxjs';
import {ExamObligationTypePage} from '../../../model/exam-obligation/exam-obligation-type-page';
import {ExamObligationTypeDialogOptions} from '../../exam-obligation-type/exam-obligation-type.component';
import {take} from 'rxjs/operators';

export interface ExamObligationDialogOptions {
  state: FORM_STATE;
  examObligationForEdit: ExamObligation | undefined;
  cancel: () => void;
  save: (examObligation: ExamObligation) => void;
}

@Component({
  selector: 'app-exam-obligation-form-dialog',
  templateUrl: './exam-obligation-form-dialog.component.html',
  styleUrls: ['./exam-obligation-form-dialog.component.css']
})
export class ExamObligationFormDialogComponent implements OnInit {
  @Input('opened') opened = false;
  @Input('options') options!: ExamObligationDialogOptions;

  @ViewChild('f') form!: NgForm;

  originalPoints: number | undefined;
  originalDescription: string | undefined;
  originalExamObligationType: ExamObligationType | undefined;

  examObligationTypePage$: Observable<ExamObligationTypePage> = of();

  examObligation: ExamObligation = {
    description: '',
    examObligationType: {
      name: ''
    },
    course: {
      name: '',
    }
  };

  examObligationTypeFormOpened: boolean = false;

  examObligationTypeFormOptions: ExamObligationTypeDialogOptions = {
    state: FORM_STATE.ADD,
    examObligationTypeForEdit: undefined,
    cancel: () => {},
    save: (examObligationType: ExamObligationType) => {}
  };


  ngOnChanges(changes: SimpleChanges): void {
    if(
      changes.options &&
      this.options.examObligationForEdit &&
      this.options.state === FORM_STATE.EDIT
    ) {
      this.originalPoints = this.options.examObligationForEdit.points;
      this.originalDescription = this.options.examObligationForEdit.description;
      this.originalExamObligationType = this.options.examObligationForEdit.examObligationType;
      this.examObligation = {...this.options.examObligationForEdit};
    }
    if (
      changes.opened &&
      !changes.opened.firstChange &&
      !changes.opened.currentValue
    ) {

    }
  }

  constructor(private examObligationTypeService: ExamObligationTypeService) { }

  ngOnInit(): void {
    this.examObligationTypePage$ = this.examObligationTypeService.getExamObligationTypes();
  }

  resetForm(): void{
    setTimeout(() => {
      this.form.resetForm();
      this.examObligation = {
        description: '',
        examObligationType: {
          name: ''
        },
        course: {
          name: '',
        }
      };
    }, 3000);
  }

  get FORM_STATE() {
    return FORM_STATE;
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid){
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.examObligation);
    }
    this.resetForm();
  }

  onNewExamObligationTypeClick(): void{
    this.examObligationTypeFormOpened = true;

    this.examObligationTypeFormOptions = {
      state: FORM_STATE.ADD,
      examObligationTypeForEdit: undefined,
      cancel: () => {
        this.examObligationTypeFormOpened = false;
      },
      save: (examObligationType: ExamObligationType) => {
        this.examObligationTypeService
          .createExamObligationType(examObligationType)
          .pipe(take(1))
          .subscribe(() => {
            this.examObligationTypeFormOpened = false;
            this.examObligationTypePage$ = this.examObligationTypeService.getExamObligationTypes();
          });
      }
    };
  }

}
