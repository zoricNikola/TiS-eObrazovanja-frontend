import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TRANSACTION_TYPE } from 'src/app/model/student/transaction-type';
import { NgForm } from '@angular/forms';

export interface TransactionFormDialogOptions {
  cancel: () => void;
  save: (transaction: any) => void;
}

@Component({
  selector: 'transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
  styleUrls: ['./transaction-form-dialog.component.css']
})
export class TransactionFormDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('options') options!: TransactionFormDialogOptions;

  @ViewChild('f') form!: NgForm;

  constructor() { }

  get TRANSACTION_TYPE() {
    return TRANSACTION_TYPE;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opened && !changes.opened.firstChange && !changes.opened.currentValue) {
      setTimeout(() => {
        this.form.resetForm();
      }, 300);
    }
  }

  ngOnInit(): void {
  }

  submit() {
    this.form.form.markAllAsTouched();

    if (this.form.valid) {
      (document.activeElement as HTMLElement).blur();
      this.options.save(this.form.value);
    }
  }

}
