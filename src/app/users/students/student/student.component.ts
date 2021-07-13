import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { Student } from 'src/app/model/student/student';
import { StudentsService } from 'src/app/services/students.service';
import { TransactionFormDialogOptions } from './../transaction-form-dialog/transaction-form-dialog.component';
import { Transaction } from './../../../model/student/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionPage } from 'src/app/model/student/transaction-page';
import { FinancialCardService } from './../../../services/financial-card.service';
import { PageParams } from 'src/app/model/http/page-params';
import { SortParamsUtils } from './../../../services/utils/sort-params-utils.service';
import { TRANSACTION_TYPE } from 'src/app/model/student/transaction-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: '[student]',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  editMode: boolean = false;

  originalStudent!: Student;
  student!: Student;

  showEnrollments: boolean = false;

  showTransactions: boolean = false;
  transactionsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: 1,
    size: null,
    sort: []
  });
  transactionsPage$: Observable<TransactionPage> = of();

  showDocuments: boolean = false;

  constructor(private route: ActivatedRoute, private studentService: StudentsService, 
          private transactionService: TransactionService, private financialCardService: FinancialCardService, 
          public sortParamsUtils: SortParamsUtils) { }

  fetchStudent(): void {
    const studentId: number = this.route.snapshot.params.id;

    this.studentService.getStudent(studentId).pipe(take(1)).subscribe((student: Student) => {
      this.originalStudent = student;
      this.student = {
        ...student,
        user: {...student.user}
      };
      this.fetchTransactions();
    });
  }

  fetchTransactions(): void {
    this.transactionsPage$ = this.transactionsQueryMap.pipe(switchMap((paramMap) => {
      let pageParams: PageParams = new PageParams(
        paramMap.page,
        paramMap.size
      );

      let queryParams = {
        sort: paramMap.sort,
      };

      return this.financialCardService.filterTransactions(this.originalStudent.financialCard!.id, 
        pageParams, queryParams);
    }));
  }

  ngOnInit(): void {
    this.fetchStudent();
  }

  get TRANSACTION_TYPE() {
    return TRANSACTION_TYPE;
  }

  isTransactionPayment(type: any): boolean {
    return TRANSACTION_TYPE[type] === TRANSACTION_TYPE.PAYMENT as any;
  }

  onCancel(form: NgForm): void {
    this.editMode = false;
    form.resetForm({ ...this.originalStudent, user: {...this.originalStudent.user} });
  }

  submit(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid) {
      this.studentService
            .updateStudent(this.originalStudent.id!, this.student)
            .pipe(take(1))
            .subscribe(() => {
              this.originalStudent = { ...this.student, user: {...this.student.user} };
              this.editMode = false;
            });
    }
  }

  onTransactionSortOptionsChange(sortParams: string[], triggeredProperty: string): void {
    let newSortParams = this.sortParamsUtils.updateSortParams(
      sortParams,
      triggeredProperty
    );
    
    this.transactionsQueryMap.next({
      ...this.transactionsQueryMap.value,
      sort: newSortParams
    });
  }

  onTransactionPageChange(selectedPage: number): void {
    this.transactionsQueryMap.next({
      ...this.transactionsQueryMap.value,
      page: selectedPage
    });
  }

  onTransactionPageSizeChange(selectedPageSize: number): void {
    this.transactionsQueryMap.next({
      ...this.transactionsQueryMap.value,
      size: selectedPageSize
    });
  }

  transactionFormDialogOpened: boolean = false;
  transactionFormDialogOptions: TransactionFormDialogOptions = {
    cancel: () => {},
    save: (transaction: any) => {},
  };

  onNewTransactionClick(): void {
    this.transactionFormDialogOpened = true;

    this.transactionFormDialogOptions = {
      cancel: () => this.transactionFormDialogOpened = false,
      save: (transactionInput: any) => {
        let transaction: Transaction = {
          ammount: transactionInput.ammount,
          description: transactionInput.description,
          type: transactionInput.type,
          financialCard: this.student.financialCard!
        };

        this.transactionService.createTransaction(transaction)
          .pipe(take(1)).subscribe((id) => {
            this.transactionFormDialogOpened = false;
            
            this.fetchStudent();
          })
      }
    };
  }

}
