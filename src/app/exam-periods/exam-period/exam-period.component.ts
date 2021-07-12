import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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

  }

  onEditExamClick(exam: Exam): void {

  }

  onDeleteExamClick(exam: Exam): void {

  }

}
