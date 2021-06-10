import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {TeacherRolePage} from '../model/teacher/teacher-role-page';
import {TeacherRole} from '../model/teacher/teacher-role';

@Injectable({
  providedIn: 'root'
})
export class TeacherRoleService extends BaseService{
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/teacherRoles`, http);
  }

  getTeacherRoles(): Observable<TeacherRolePage> {
    return this.http.get<TeacherRolePage>(`${environment.apiUrl}/teacherRoles`, {headers: this.headers});
  }

  createTeacherRole(teacherRole: TeacherRole): Observable<number> {
    return this.create(teacherRole);
  }

}
