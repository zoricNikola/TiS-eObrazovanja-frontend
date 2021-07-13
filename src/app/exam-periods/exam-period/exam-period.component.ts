import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmationDialogOptions } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { ExamFormDialogOptions } from 'src/app/courses/exam-form-dialog/exam-form-dialog.component';
import { FORM_STATE } from 'src/app/model/common/form-state';
import { ExamPeriod } from 'src/app/model/exam-period/exam-period';
import { Exam } from 'src/app/model/exam/exam';
import { ExamPage } from 'src/app/model/exam/exam-page';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-exam-period',
  templateUrl: './exam-period.component.html',
  styleUrls: ['./exam-period.component.css']
})
export class ExamPeriodComponent implements OnInit {

  showExams: boolean = false;

  selectedExamPeriodId = this.route.snapshot.params.id;

  examPeriod$: Observable<ExamPeriod> = of();

  examPeriod!: ExamPeriod;

  examPeriodExamsPage$: Observable<ExamPage> = of();

  examFormDialogOpened: boolean = false;
  examFormDialogOptions: ExamFormDialogOptions = {
    state: FORM_STATE.ADD,
    examForEdit: undefined,
    cancel: () => {},
    save: (exam:Exam) => {}
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private examPeriodService: ExamPeriodService,
              private examService: ExamsService) { }

  ngOnInit(): void {
    this.examPeriod$ = this.examPeriodService.getExamPeriod(this.selectedExamPeriodId);
    this.examPeriodExamsPage$ = this.examService.getExamPeriodExams(this.selectedExamPeriodId);
    this.examPeriod$.subscribe(result => this.examPeriod = result);
  }

  goBack(): void {
    window.history.back();
  }

  refreshPage(): void {
    this.router.navigate([])
      .then(() => {
        window.location.reload();
      });
  }

  onNewExamClick(): void {
    this.examFormDialogOpened = true;

    this.examFormDialogOptions = {
      state: FORM_STATE.ADD,
      examForEdit: undefined,
      cancel: () => {this.examFormDialogOpened = false},
      save: (exam: Exam) => {
        exam.examPeriod = this.examPeriod;
        this.examService
        .saveExam(exam)
        .pipe(take(1))
        .subscribe((id) => {
          console.log('Created exam with id: ' + id);
          this.examFormDialogOpened = false;
          this.refreshPage();
        });
      }
    };

  }

  onEditExamClick(exam: Exam): void {
    this.examFormDialogOpened = true;

    exam.examPeriod = this.examPeriod;
    this.examFormDialogOptions = {
      state: FORM_STATE.EDIT,
      examForEdit: exam,
      cancel: () => {this.examFormDialogOpened = false},
      save: (exam: Exam) => {
        this.examService
        .updateExam(exam.id!, exam)
        .pipe(take(1))
        .subscribe(() => {
          console.log('Created exam with id: ' + exam.id);
          this.examFormDialogOpened = false;
          this.refreshPage();
        });
      }
    };
  }

  confirmationDialogOpened: boolean = false;
  confirmationDialogOptions: ConfirmationDialogOptions = {
    title: '',
    message: '',
    decline: () => {},
    confirm: () => {},
  };

  onDeleteExamClick(exam: Exam): void {
    this.confirmationDialogOpened = true;

    this.confirmationDialogOptions = {
      title: `Delete exam ${exam.course.name} for ${exam.examPeriod.name}`,
      message: `Are you sure?`,
      decline: () => {
        this.confirmationDialogOpened = false;
      },
      confirm: () => {
        this.examService.
        deleteExam(exam.id!).
        pipe(take(1)).
        subscribe(() => {
          this.confirmationDialogOpened = false;
          this.refreshPage();
        });
      }
    };
  }

}
