import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Student } from '../model/student/student';
import { map } from 'rxjs/operators';

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

  updateStudent(id: number, student: Student): Observable<void> {
    return this.update(id, student);
  }

  getStudents() {
    console.log('calling');
    return this.backend.getStudents();
  }
}
