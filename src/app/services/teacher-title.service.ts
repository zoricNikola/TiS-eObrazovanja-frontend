import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageParams } from '../model/http/page-params';
import { ResponsePage } from '../model/http/response-page';
import { TeacherTitle } from '../model/teacher/teacher-title';
import { TeacherTitlePage } from '../model/teacher/teacher-title-page';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherTitleService extends BaseService {
  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/teacherTitles`, http);
  }

  getTeacherTitles(): Observable<TeacherTitlePage> {
    return this.filter(null).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<TeacherTitle>;
        let page: TeacherTitlePage = {
          content: body.content,
          contentCount: body.numberOfElements,
          totalItemsCount: body.totalElements,
          totalPagesCount: body.totalPages,
          pageSize: 0,
          currentPage: 0,
          queryParams: null,
        };
        return page;
      })
    );
  }
}
