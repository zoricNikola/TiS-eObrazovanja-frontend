import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageParams } from '../model/http/page-params';
import { TransactionPage } from '../model/student/transaction-page';
import { map, catchError } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';
import { Transaction } from '../model/student/transaction';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { NotFoundError } from '../common/not-found-error';
import { EntityValidationError } from '../common/entity-validation-error';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class FinancialCardService {

  constructor(private http: HttpClient) {}

  filterTransactions(financialCardId: number, pageParams: PageParams, queryParams?: any): Observable<TransactionPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;

    return this.http.get(`${environment.apiUrl}/financialCards/${financialCardId}/transactions`, { params, observe: 'response' })
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

  protected handleError(error: Response) {
    if (error.status === 404) return throwError(new NotFoundError(error));
    if (error.status === 422)
      return throwError(new EntityValidationError(error));
    return throwError(new AppError(error));
  }
}
