import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { User } from '../model/user/user';
import { PageParams } from '../model/http/page-params';
import { AdminPage } from '../model/user/admin-page';
import { map, catchError } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminsService extends BaseService {
  constructor(http: HttpClient, private authService: AuthService) {
    super(`${environment.apiUrl}/admins`, http);
  }

  createAdmin(admin: User): Observable<number> {
    let { username, firstName, lastName, email, phoneNumber } = admin;

    return this.create({ username, firstName, lastName, email, phoneNumber });
  }

  updateAdmin(id: number, admin: User): Observable<void> {
    let { username, firstName, lastName, email, phoneNumber } = admin;

    return this.update(id, {
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  }

  deleteAdmin(id: number): Observable<void> {
    return this.delete(id);
  }

  getAdmins(pageParams: PageParams, queryParams?: any): Observable<AdminPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
      ...queryParams,
    };

    return this.http
      .get(`${this.url}`, { params, observe: 'response' })
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
