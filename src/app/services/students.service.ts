import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private backend: FakeBackendService) { }

  getStudents() {
    console.log('calling')
    return this.backend.getStudents();
  }
}
