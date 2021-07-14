import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
import { switchMap, take } from 'rxjs/operators';
import { PageParams } from 'src/app/model/http/page-params';
import { TRANSACTION_TYPE } from 'src/app/model/student/transaction-type';
import { Transaction } from 'src/app/model/student/transaction';
import { TransactionPage } from './../../model/student/transaction-page';
import { FinancialCardService } from './../../services/financial-card.service';
import { SortParamsUtils } from './../../services/utils/sort-params-utils.service';
import { TransactionFormDialogOptions } from './../../users/students/transaction-form-dialog/transaction-form-dialog.component';

@Component({
  selector: '[transactions]',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @Input('financialCardId') financialCardId!: number;
  @Output('transactionCreated') transactionCreated: EventEmitter<void> = new EventEmitter();

  transactionsQueryMap: BehaviorSubject<any> = new BehaviorSubject({
    page: 1,
    size: null,
    sort: []
  });
  transactionsPage$: Observable<TransactionPage> = of();

  constructor(private transactionService: TransactionService, private financialCardService: FinancialCardService, 
    public sortParamsUtils: SortParamsUtils) { }

  ngOnInit(): void {
    this.transactionsPage$ = this.transactionsQueryMap.pipe(switchMap((paramMap) => {
      let pageParams: PageParams = new PageParams(
        paramMap.page,
        paramMap.size
      );

      let queryParams = {
        sort: paramMap.sort,
      };

      return this.financialCardService.filterTransactions(this.financialCardId, 
        pageParams, queryParams);
    }));
  }

  get TRANSACTION_TYPE() {
    return TRANSACTION_TYPE;
  }

  isTransactionPayment(type: any): boolean {
    return TRANSACTION_TYPE[type] === TRANSACTION_TYPE.PAYMENT as any;
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
          financialCard: {
            id: this.financialCardId,
            currentAmmount: 0,
            totalDeposit: 0,
            totalSpent: 0
          }
        };

        this.transactionService.createTransaction(transaction)
          .pipe(take(1)).subscribe((id) => {
            this.transactionFormDialogOpened = false;
            
            this.transactionsQueryMap.next({
              ...this.transactionsQueryMap.value,
              r: 'r'
            });
            this.transactionCreated.emit();
          })
      }
    };
  }

}
