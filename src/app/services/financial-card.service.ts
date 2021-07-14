import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageParams } from '../model/http/page-params';
import { TransactionPage } from '../model/student/transaction-page';
import { map, catchError } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';
import { Transaction } from '../model/student/transaction';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialCardService extends BaseService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/financialCards`, http);
  }

  filterTransactions(financialCardId: number, pageParams: PageParams, queryParams?: any): Observable<TransactionPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;

    return this.http.get(`${this.url}/${financialCardId}/transactions`, { params, observe: 'response' })
      .pipe(map((response) => response.body)).pipe(catchError(this.handleError))
      .pipe(map((responseBody) => {
        const body = responseBody as ResponsePage<Transaction>;
        let page: TransactionPage = {
          content: body.content,
          contentCount: body.numberOfElements,
          totalItemsCount: body.totalElements,
          totalPagesCount: body.totalPages,
          pageSize: pageParams.size,
          currentPage: pageParams.page,
          queryParams: queryParams,
        };
        return page;
      }));
  }
}
