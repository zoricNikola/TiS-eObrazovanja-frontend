import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExamPeriodDialogComponent } from '../dialogs/input-dialogs/exam-period-dialog/exam-period-dialog.component';
import { ExamPeriod } from '../model/exam-period';
import { ExamPeriodService } from '../services/exam-period.service';

@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css']
})
export class ExamPeriodsComponent implements OnInit {

  examPeriods: any[] = []; 
  
  showSearchBox: boolean = false; 

  constructor(private examPeriodService: ExamPeriodService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadExamPeriods();
  }

  loadExamPeriods(){
    this.examPeriodService.getExamPeriods().subscribe(result => {
      this.examPeriods = result;
    })
  }

  openDialog(id: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = null;

    if(id === 0){//CREATE MODE
      dialogRef = this.dialog.open(ExamPeriodDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(val => this.addExamPeriod(val));

    }else if(id > 0){//EDIT MODE
      dialogConfig.data = this.examPeriods.find(examPeriod => examPeriod._id === id);
      dialogRef = this.dialog.open(ExamPeriodDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(val => this.editExamPeriod(val));
    }
  }

  addExamPeriod(newExamPeriod: ExamPeriod){
    this.examPeriods.push(newExamPeriod);
  }

  editExamPeriod(editedExamPeriod: ExamPeriod){
  }
}
