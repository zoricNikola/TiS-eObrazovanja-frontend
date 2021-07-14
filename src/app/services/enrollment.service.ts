import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Enrollment } from './../model/student/enrollment';
import { Observable } from 'rxjs';
import { EnrollmentPage } from '../model/student/enrollment-page';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/enrollments`, http);
  }

  getCourseEnrollments(courseId: number): Observable<EnrollmentPage> {
    const url = `${environment.apiUrl}/courses/${courseId}/enrollments`;
    return this.http.get<EnrollmentPage>(url, {headers: this.headers});
  }
  
  createEnrollment(enrollment: Enrollment): Observable<number> {
    return this.create(enrollment);
  }
}
