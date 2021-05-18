import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private backend: FakeBackendService) {}
    getCourses(): Observable<any[]>{
    return this.backend.getCourses();
  }
}
