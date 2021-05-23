import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../dialogs/confirmation-dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { ExamPeriodDialogComponent } from '../dialogs/input-dialogs/exam-period-dialog/exam-period-dialog.component';
import { FORM_STATE } from '../model/common/form-state';
import { ExamPeriod } from '../model/exam-period';
import { ExamPeriodService } from '../services/exam-period.service';

@Component({
  selector: 'app-exam-periods',
  templateUrl: './exam-periods.component.html',
  styleUrls: ['./exam-periods.component.css'],
  providers: [DatePipe]
})
export class ExamPeriodsComponent implements OnInit {


  showSearchBox: boolean = false;

  examperiodFormDialogOpened: boolean = false;
  examPeriodFormDialogState: FORM_STATE = FORM_STATE.ADD;

  examPeriodForEdit: ExamPeriod | undefined = undefined;



  examPeriods: any[] = []; 
  

  constructor(private examPeriodService: ExamPeriodService, private dialog: MatDialog, public datePipe: DatePipe) { }

  get FORM_STATE() {
    return FORM_STATE;
  }

  ngOnInit(): void {
    this.loadExamPeriods();
  }

  loadExamPeriods(){
    this.examPeriodService.getExamPeriods().subscribe(result => {
      this.examPeriods = result;
    });
  }

  openExamPeriodFormDialog(state: FORM_STATE){
    this.examPeriodFormDialogState = state;
    this.examperiodFormDialogOpened = true;
  }

  onExamPeriodDialogCancel(): void{
    this.examperiodFormDialogOpened = false;
    this.examPeriodForEdit = undefined;
  }

  onExamPeriodSave(examPeriod: ExamPeriod): void{
    console.log('new exam period: ' + examPeriod);
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

  openDeleteDialog(id: number): void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = null;

    if(id != 0 && id != null){
      var examPeriodName = this.examPeriods.find(examPeriod => examPeriod._id === id).name;
      dialogConfig.data = {id: id, name: examPeriodName};
      dialogRef = this.dialog.open(DeleteConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(val => {
        if(val.confirmation == true) {
          this.deleteExamPeriod(val.data);}
      });
    }
  }

  addExamPeriod(newExamPeriod: ExamPeriod){
    this.examPeriods.push(newExamPeriod);
  }

  editExamPeriod(id: number, examPeriod: ExamPeriod){
    var foundIndex = this.examPeriods.findIndex(obj => obj._id === id);
    this.examPeriods[foundIndex] = examPeriod;
  }

  deleteExamPeriod(id: number){
    this.examPeriods = this.examPeriods.filter(obj => obj._id !== id);
  }
}
