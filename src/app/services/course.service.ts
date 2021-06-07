import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Course} from '../model/course/course';
import {TeachingsPage} from '../model/teacher/teachings-page';


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService{
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  courseId!: number;

  constructor(http: HttpClient, private authService: AuthService) {
    super(`${environment.apiUrl}`, http);
  }

  getCourse(id: number): Observable<Course>{
    const url = `${environment.apiUrl}/courses/${id}`;
    return this.http.get<Course>(url, {headers: this.headers});
  }

  getCourseId(id: number): void{
    this.courseId = id;
  }

  getTeachersTeachingCourse(): Observable<TeachingsPage>{
    const url = `${environment.apiUrl}/courses/${this.courseId}/teachings`;
    return this.http.get<TeachingsPage>(url, {headers: this.headers});
  }
}
