import { Component, OnInit } from '@angular/core';
import { ExamPeriodService } from '../services/exam-period.service';

@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css']
})
export class ExamPeriodsComponent implements OnInit {

  examPeriods: any[] = []; 
  
  showSearchBox: boolean = false; 

  constructor(private examPeriodService: ExamPeriodService) { }

  ngOnInit(): void {
    this.loadExamPeriods();
  }

  loadExamPeriods(){
    this.examPeriodService.getExamPeriods().subscribe(result => {
      this.examPeriods = result;
    })
  }

}
