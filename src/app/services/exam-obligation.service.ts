import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ExamObligation} from '../model/exam-obligation/exam-obligation';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageParams} from '../model/http/page-params';
import {ExamObligationPage} from '../model/exam-obligation/exam-obligation-page';
import {ResponsePage} from '../model/http/response-page';

@Injectable({
  providedIn: 'root'
})
export class ExamObligationService extends BaseService{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/examObligations`, http);
  }

  createExamObligation(examObligation: ExamObligation): Observable<number> {
    let { points, description, examObligationType, course } = examObligation;

    return this.create({points, description, examObligationType, course});
  }

  updateExamObligation(id: number, examObligation: ExamObligation): Observable<void> {
    let { points, description, examObligationType, course } = examObligation;

    return this.update(id, {points, description, examObligationType, course});
  }

  deleteExamObligation(id: number): Observable<void> {
    return this.delete(id);
  }

  getExamObligation(id: number): Observable<ExamObligation> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as ExamObligation));
  }

  filterExamObligations(
    pageParams: PageParams,
    courseId: number | undefined,
    queryParams?: any
  ): Observable<ExamObligationPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;
    if (queryParams.points) params['points'] = queryParams.points;
    if (queryParams.description) params['description'] = queryParams.description;
    if (queryParams.examObligationType) params['examObligationType'] = queryParams.examObligationType;
    if (queryParams.course) params['course'] = queryParams.course;

    return this.getExamObligations(params, courseId).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<ExamObligation>;
        let page: ExamObligationPage = {
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

  getExamObligations(params: any, courseId?: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/examObligations/${courseId}/course`,
      {params, observe: 'response'}
    ).pipe(map((response) => response.body))
      .pipe(catchError(this.handleError));
  }
}
