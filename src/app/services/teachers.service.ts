import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { Teacher } from '../model/teacher/teacher';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PageParams } from '../model/http/page-params';
import { TeacherPage } from '../model/teacher/teacher-page';
import { ResponsePage } from '../model/http/response-page';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends BaseService {

  constructor(http: HttpClient, private authService: AuthService) {
    super(`${environment.apiUrl}/teachers`, http);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as Teacher));
  }

  updateTeacher(id: number, teacher: Teacher): Observable<void> {
    return this.update(id, teacher);
  }

  createTeacher(teacher: Teacher): Observable<number> {
    return this.create(teacher);
  }

  filterTeachers(pageParams: PageParams, queryParams?: any): Observable<TeacherPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size
    };

    if(queryParams.firstName) params['firstName'] = queryParams?.firstName;
    if(queryParams.lastName) params['lastName'] = queryParams?.lastName;
    if(queryParams.username) params['username'] = queryParams?.username;
    if(queryParams.address) params['address'] = queryParams?.address;
    if(queryParams.teacherTitleName) params['teacherTitleName'] = queryParams?.teacherTitleName;
    if(queryParams.dateofBirthFrom) params['dateOfBirthFrom'] = queryParams?.dateOfBirthFrom;
    if(queryParams.dateofBirthTo) params['dateOfBirthTo'] = queryParams?.dateOfBirthTo;
    if(queryParams.email) params['email'] = queryParams?.email;
    if(queryParams.phoneNumber) params['phoneNumber'] = queryParams?.phoneNumber;

    return this.filter(params).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<Teacher>;
        let page : TeacherPage = {
          content: body.content,
          contentCount: body.numberOfElements,
          totalItemsCount: body.totalElements,
          totalPagesCount: body.totalPages,
          pageSize: pageParams.size,
          currentPage: pageParams.page,
          queryParams: queryParams,
        }
        return page;
      })
    );
  }
}
