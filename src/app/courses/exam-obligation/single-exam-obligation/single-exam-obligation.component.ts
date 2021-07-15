import { Component, OnInit } from '@angular/core';
import { ExamObligationService } from './../../../services/exam-obligation.service';
import { ExamObligation } from './../../../model/exam-obligation/exam-obligation';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: '[single-exam-obligation]',
  templateUrl: './single-exam-obligation.component.html',
  styleUrls: ['./single-exam-obligation.component.css'],
})
export class SingleExamObligationComponent implements OnInit {
  examObligation!: ExamObligation;

  constructor(
    private route: ActivatedRoute,
    private examObligationService: ExamObligationService
  ) {}

  ngOnInit(): void {
    const examObligationId: number = this.route.snapshot.params.id;

    this.examObligationService
      .getExamObligation(examObligationId)
      .pipe(take(1))
      .subscribe((obligation: ExamObligation) => {
        this.examObligation = obligation;
      });
  }
}
