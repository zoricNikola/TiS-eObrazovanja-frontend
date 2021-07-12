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

  getExamPeriod(id: number): Observable<ExamPeriod> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as ExamPeriod));
  }

  filterExamPeriods(pageParams: PageParams, queryParams? : any): Observable<ExamPeriodPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size
    };

    if(queryParams.sort?.length > 0) params['sort'] = queryParams.sort;
    if(queryParams.name) params['name'] = queryParams?.name;
    if(queryParams.startDate) params['startDate'] = queryParams?.startDate;
    if(queryParams.endDate) params['endDate'] = queryParams?.endDate;

    console.log(params);

    return this.filter(params).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<ExamPeriod>;
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
    );
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
