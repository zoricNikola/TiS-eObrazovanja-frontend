import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PageParams } from '../model/http/page-params';
import { Observable } from 'rxjs';
import { CoursePage } from '../model/course/course-page';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';
import { Course } from '../model/course/course';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService{

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/institutions/1/courses`, http);
  }

    getCourses(pageParams: PageParams, queryParams?: any): Observable<CoursePage> {
      let params: any = {
        page: pageParams.page,
        size: pageParams.size,
        ...queryParams
      };

      return this.http
        .get(`${environment.apiUrl}/institutions/1/courses`, { params, observe: 'response' })
        .pipe(
          map((response: HttpResponse<Object>) => {
            const body = response.body as ResponsePage<Course>;
            let page: CoursePage = {
              content: body.content,
              contentCount: body.numberOfElements,
              totalItemsCount: body.totalElements,
              totalPagesCount: body.totalPages,
              pageSize: pageParams.size,
              currentPage: pageParams.page,
              queryParams: queryParams
            };
            console.log(page.content);
            return page;
          })
        )
        .pipe(catchError(this.handleError));
    }
  }

