import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam-period-search-form',
  templateUrl: './exam-period-search-form.component.html',
  styleUrls: ['./exam-period-search-form.component.css']
})
export class ExamPeriodSearchFormComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

}
