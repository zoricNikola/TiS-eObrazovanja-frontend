import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { User } from '../model/user/user';
import { PageParams } from '../model/http/page-params';
import { AdminPage } from '../model/user/admin-page';
import { map } from 'rxjs/operators';
import { ResponsePage } from '../model/http/response-page';

@Injectable({
  providedIn: 'root',
})
export class AdminsService extends BaseService {
  constructor(http: HttpClient) {
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

  getAdmin(id: number): Observable<User> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as User));
  }

  filterAdmins(
    pageParams: PageParams,
    queryParams?: any
  ): Observable<AdminPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;
    if (queryParams.firstName) params['firstName'] = queryParams.firstName;
    if (queryParams.lastName) params['lastName'] = queryParams.lastName;
    if (queryParams.username) params['username'] = queryParams.username;
    if (queryParams.email) params['email'] = queryParams.email;
    if (queryParams.phoneNumber)
      params['phoneNumber'] = queryParams.phoneNumber;

    console.log(params);

    return this.filter(params).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<User>;
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
    );
  }
}
