import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient, private backend: FakeBackendService) { }

  getTeachers() {
    return this.backend.getTeachers();
  }
}
