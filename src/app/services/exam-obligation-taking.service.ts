import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ExamObligationTaking } from './../model/exam-obligation/exam-obligation-taking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamObligationTakingService extends BaseService {
  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/examObligationTakings`, http);
  }

  createTaking(taking: ExamObligationTaking): Observable<number> {
    return this.create(taking);
  }
}
