import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';
import { BaseService } from './base.service';
import { environment } from './../../environments/environment';
import { Teacher } from '../model/teacher/teacher';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends BaseService {
  constructor(http: HttpClient, private backend: FakeBackendService) {
    super(`${environment.apiUrl}/teachers`, http);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.getOne(id).pipe(map((responseBody) => responseBody as Teacher));
  }

  updateTeacher(id: number, teacher: Teacher): Observable<void> {
    return this.update(id, teacher);
  }

  getTeachers() {
    return this.backend.getTeachers();
  }
}
