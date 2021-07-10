import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {ExamPage} from '../model/exam/exam-page';
import {Exam} from '../model/exam/exam';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {PageParams} from '../model/http/page-params';
import {ResponsePage} from '../model/http/response-page';

@Injectable({
  providedIn: 'root'
})
export class ExamsService extends BaseService{
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient) {
    super(``, http);
  }

  getCourseExams(courseId: number): Observable<ExamPage> {
    return this.http.get<ExamPage>(
      `${environment.apiUrl}/courses/${courseId}/exams`,
      {headers: this.headers});
  }

  filterCourseExams(pageParams: PageParams, queryParams?: any, courseId?: number): Observable<ExamPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;
    if (queryParams.courseName) params['courseName'] = queryParams?.courseName;
    if (queryParams.description) params['description'] = queryParams?.description;
    if (queryParams.classroom) params['classroom'] = queryParams?.classroom;
    if (queryParams.points) params['points'] = queryParams?.points;
    if (queryParams.examPeriodName) params['examPeriodName'] = queryParams?.examPeriodName;
    if (queryParams.dateFrom) params['dateFrom'] = queryParams?.dateFrom;
    if (queryParams.dateTo) params['dateTo'] = queryParams?.dateTo;


    return this.courseExamFilter(params, courseId)
      .pipe(map((responseBody) => {
        const body = responseBody as ResponsePage<Exam>;
        let page: ExamPage = {
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

  courseExamFilter(params: any, courseId?: number): Observable<any> {
    if (courseId !== undefined){
      return this.http.get(
        `${environment.apiUrl}/courses/${courseId}/exams`,
        {params, observe: 'response'}
      ).pipe(map((response) => response.body))
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get(
        `${environment.apiUrl}/exams`,
        {params, observe: 'response'}
      ).pipe(map((response) => response.body))
        .pipe(catchError(this.handleError));
    }
  }

  saveExam(exam: Exam): Observable<number> {
    return this.http.post(
      `${environment.apiUrl}/exams`,
      JSON.stringify(exam),
      {observe: 'response', headers: this.headers}
    ).pipe(map((response) => response.body as number))
      .pipe(catchError(this.handleError));
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete(
      `${environment.apiUrl}/exams/${id}`,
      {observe: 'response'}
    ).pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }

  updateExam(id: number, exam: Exam): Observable<void> {
    return this.http.put(
      `${environment.apiUrl}/exams/${id}`,
      JSON.stringify(exam),
      {observe: 'response', headers: this.headers}
    ).pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }
}
