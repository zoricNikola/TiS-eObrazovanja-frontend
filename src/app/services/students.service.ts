import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Student } from '../model/student/student';
import { map, catchError } from 'rxjs/operators';
import { PageParams } from '../model/http/page-params';
import { StudentPage } from '../model/student/student-page';
import { ResponsePage } from './../model/http/response-page';
import { EnrollmentPage } from '../model/student/enrollment-page';
import { Enrollment } from './../model/student/enrollment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends BaseService {
  constructor(http: HttpClient, private backend: FakeBackendService) {
    super(`${environment.apiUrl}/students`, http);
  }

  getStudent(id: number): Observable<Student> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as Student));
  }

  createStudent(student: Student): Observable<number> {
    return this.create(student);
  }

  updateStudent(id: number, student: Student): Observable<void> {
    return this.update(id, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.delete(id);
  }

  filterStudents(
    pageParams: PageParams,
    queryParams?: any
  ): Observable<StudentPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;
    if (queryParams.firstName) params['firstName'] = queryParams.firstName;
    if (queryParams.lastName) params['lastName'] = queryParams.lastName;
    if (queryParams.studentCard)
      params['studentCard'] = queryParams.studentCard;
    if (queryParams.address) params['address'] = queryParams.address;
    if (queryParams.generationFrom)
      params['generationFrom'] = queryParams.generationFrom;
    if (queryParams.generationTo)
      params['generationTo'] = queryParams.generationTo;
    if (queryParams.dateOfBirthFrom)
      params['dateOfBirthFrom'] = queryParams.dateOfBirthFrom;
    if (queryParams.dateOfBirthTo)
      params['dateOfBirthTo'] = queryParams.dateOfBirthTo;
    if (queryParams.username) params['username'] = queryParams.username;
    if (queryParams.email) params['email'] = queryParams.email;
    if (queryParams.phoneNumber)
      params['phoneNumber'] = queryParams.phoneNumber;

    console.log(params);

    return this.filter(params).pipe(
      map((responseBody) => {
        const body = responseBody as ResponsePage<Student>;
        let page: StudentPage = {
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

  filterEnrollments(studentId: number, pageParams: PageParams, queryParams?: any): Observable<EnrollmentPage> {
    let params: any = {
      page: pageParams.page,
      size: pageParams.size,
    };

    if (queryParams.sort.length > 0) params['sort'] = queryParams.sort;

    return this.http.get(`${this.url}/${studentId}/enrollments`, { params, observe: 'response' })
      .pipe(map((response) => response.body)).pipe(catchError(this.handleError))
      .pipe(map((responseBody) => {
        const body = responseBody as ResponsePage<Enrollment>;
        let page: EnrollmentPage = {
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
}
