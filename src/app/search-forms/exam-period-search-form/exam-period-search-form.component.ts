import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-exam-period-search-form',
  templateUrl: './exam-period-search-form.component.html',
  styleUrls: ['./exam-period-search-form.component.css']
})
export class ExamPeriodSearchFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('My search form data : ', form.value);
}

}
