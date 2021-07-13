import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Course} from '../model/course/course';


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService{

  constructor(http: HttpClient, private authService: AuthService) {
    super(`${environment.apiUrl}`, http);
  }

  getCourse(id?: number): Observable<Course>{
    const url = `${environment.apiUrl}/courses/${id}`;
    return this.http.get<Course>(url, {headers: this.headers});
  }

}
