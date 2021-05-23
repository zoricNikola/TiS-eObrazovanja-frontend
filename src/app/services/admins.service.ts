import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../fake-backend.service';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { User } from '../model/user/user';
import { PageParams } from '../model/http/page-params';
import { AdminPage } from '../model/user/admin-page';
import { map, catchError } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';

@Injectable({
  providedIn: 'root',
})
export class AdminsService extends BaseService {
  constructor(http: HttpClient, private backend: FakeBackendService) {
    super(`${environment.apiUrl}/users`, http);
  }

  getAdmins(pageParams: PageParams, queryParams?: any): Observable<AdminPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
      ...queryParams,
    };

    return this.http
      .get(`${this.url}/admins`, { params, observe: 'response' })
      .pipe(
        map((response: HttpResponse<Object>) => {
          const body = response.body as ResponsePage<User>;
          let page: AdminPage = {
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
}
