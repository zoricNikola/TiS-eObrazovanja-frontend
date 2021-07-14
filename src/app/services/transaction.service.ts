import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Transaction } from '../model/student/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/transactions`, http);
  }

  createTransaction(transaction: Transaction): Observable<number> {
    return this.create(transaction);
  }

}
