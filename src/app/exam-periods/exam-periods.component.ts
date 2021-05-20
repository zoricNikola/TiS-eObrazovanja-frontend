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
    let description = "";

    if(id === 0){//CREATE MODE
      description = "Please create a new exam period";
      dialogConfig.data = {description : description};
      dialogRef = this.dialog.open(ExamPeriodDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(val => this.addExamPeriod(val.data));

    }else if(id > 0){//EDIT MODE
      var examPeriodForEdit = this.examPeriods.find(examPeriod => examPeriod._id === id);
      description = "Please edit a selected exam period";
      dialogConfig.data = {examPeriod : examPeriodForEdit, description : description};
      dialogRef = this.dialog.open(ExamPeriodDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(val => {this.editExamPeriod(id, val.data);});
      
    }
  }

  addExamPeriod(newExamPeriod: ExamPeriod){
    this.examPeriods.push(newExamPeriod);
  }

  editExamPeriod(id: number, examPeriod: ExamPeriod){
    var foundIndex = this.examPeriods.findIndex(obj => obj._id === id);
    this.examPeriods[foundIndex] = examPeriod;
  }
}
