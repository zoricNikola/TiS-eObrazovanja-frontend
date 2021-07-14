import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnrollmentPage } from '../model/student/enrollment-page';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient, private authService: AuthService) { 
    super(``, http);
  }

  getCourseEnrollments(courseId: number): Observable<EnrollmentPage> {
    const url = `${environment.apiUrl}/courses/${courseId}/enrollments`;
    return this.http.get<EnrollmentPage>(url, {headers: this.headers});
  }
}
