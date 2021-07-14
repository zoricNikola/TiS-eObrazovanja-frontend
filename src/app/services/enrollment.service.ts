import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Enrollment } from './../model/student/enrollment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/enrollments`, http);
  }

  createEnrollment(enrollment: Enrollment): Observable<number> {
    return this.create(enrollment);
  }
}
