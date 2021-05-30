import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExamPeriod } from '../model/exam-period/exam-period';
import { ExamPeriodPage } from '../model/exam-period/exam-period-page';
import { PageParams } from '../model/http/page-params';
import { ResponsePage } from '../model/http/response-page';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ExamPeriodService extends BaseService {

  constructor(http: HttpClient, private authService: AuthService) { 
    super(`${environment.apiUrl}/examPeriods`, http);
  }

  getExamPeriods(pageParams: PageParams, queryParams? : any){
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
      ...queryParams
    };

    return this.http
    .get(`${this.url}`, { params, observe: 'response' })
    .pipe(
      map((response: HttpResponse<Object>) => {
        const body = response.body as ResponsePage<ExamPeriod>;
        let page: ExamPeriodPage = {
          content: body.content,
          contentCount: body.numberOfElements,
          totalItemsCount: body.totalElements,
          totalPagesCount: body.totalPages,
          pageSize: pageParams.size,
          currentPage: pageParams.page,
          queryParams: queryParams,
        };
        return page;
      })
    )
    .pipe(catchError(this.handleError));
  }

  createExamPeriod(examPeriod: ExamPeriod): Observable<number>{
    let body = {
      ...examPeriod,
      institution: {id: this.authService.currentUser?.institutionId}
    };
    return this.create(body);
  }

  updateExamPeriod(id: number, examPeriod: ExamPeriod): Observable<void>{
    let body = {
      ...examPeriod,
      institution: {id: this.authService.currentUser?.institutionId}
    };
    return this.update(id, body);
  }

  deleteExamPeriod(id: number): Observable<void>{
    return this.delete(id);
  }
}
