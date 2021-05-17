import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http: HttpClient, private backend: FakeBackendService) { }

  getAdmins(): Observable<any[]> {
    return this.backend.getAdmins();
  }
}
