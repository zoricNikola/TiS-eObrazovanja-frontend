import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {TeachingPage} from '../model/teacher/teaching-page';
import {Teaching} from '../model/teacher/teaching';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachingService extends BaseService{
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient, private authService: AuthService) {
    super(``, http);
  }

  getTeachersTeachingCourse(courseId: number): Observable<TeachingPage>{
    const url = `${environment.apiUrl}/courses/${courseId}/teachings`;
    return this.http.get<TeachingPage>(url, {headers: this.headers});
  }

  getTeachersTeachings(teacherId: number): Observable<TeachingPage> {
    const url = `${environment.apiUrl}/teachers/${teacherId}/teachings`;
    return this.http.get<TeachingPage>(url, {headers: this.headers});
  }

  saveTeaching(teaching: Teaching): Observable<number> {
    const url = `${environment.apiUrl}/teachings`;
    return this.http.post(url, JSON.stringify(teaching), {observe: 'response', headers: this.headers})
      .pipe(map((response) => response.body as number))
      .pipe(catchError(this.handleError));
  }

  deleteTeaching(id: number): Observable<void> {
    const url = `${environment.apiUrl}/teachings/${id}`;
    return this.http.delete(url, {observe: 'response'})
      .pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }

  updateTeaching(id: number, teaching: Teaching): Observable<void>{
    const url = `${environment.apiUrl}/teachings/${id}`;
    return this.http.put(url, JSON.stringify(teaching), {observe: 'response', headers: this.headers})
      .pipe(map((response) => {}))
      .pipe(catchError(this.handleError));
  }


}
