import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamPeriod } from 'src/app/model/exam-period';

@Component({
  selector: 'app-exam-period-dialog',
  templateUrl: './exam-period-dialog.component.html',
  styleUrls: ['./exam-period-dialog.component.css']
})
export class ExamPeriodDialogComponent implements OnInit {

  examPeriod: ExamPeriod;

  constructor(private dialogRef: MatDialogRef<ExamPeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExamPeriod) { this.examPeriod = this.data;}

  ngOnInit(): void {}

  onSubmit(form: NgForm){
    console.log('Exam period data: ' + form.value);
    this.dialogRef.close(form.value);
  }

  close(){
    this.dialogRef.close();
  }

}
