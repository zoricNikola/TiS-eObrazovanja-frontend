import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { PageParams } from '../model/http/page-params';
import { Observable } from 'rxjs';
import { CoursePage } from '../model/course/course-page';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';
import { Course } from '../model/course/course';
import { BaseService } from './base.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService{
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient, private authService: AuthService) {
    super(`${environment.apiUrl}/institutions/${authService.currentUser?.institutionId}/courses`, http);
  }

    getCourses(pageParams: PageParams, queryParams?: any): Observable<CoursePage> {
      let params: any = {
        page: pageParams.page,
        size: pageParams.size,
        ...queryParams
      };

      return this.http
        .get(`${environment.apiUrl}/institutions/${this.authService.currentUser?.institutionId}/courses`, { params, observe: 'response' })
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
            return page;
          })
        )
        .pipe(catchError(this.handleError));
    }

    createCourse(course: Course): Observable<Course> {
      const newCourse = {
        ...course,
        institution: { id: this.authService.currentUser?.institutionId }
      };

      const url = `${environment.apiUrl}/courses`;

      return this.http.post<Course>(url, JSON.stringify(newCourse), {headers: this.headers})
        .pipe(catchError(this.handleError));
    }

  }

