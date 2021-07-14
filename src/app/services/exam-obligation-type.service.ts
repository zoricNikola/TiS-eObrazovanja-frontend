import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {environment} from '../../environments/environment';
import {ExamObligationType} from '../model/exam-obligation/exam-obligation-type';
import {Observable} from 'rxjs';
import {ExamObligationTypePage} from '../model/exam-obligation/exam-obligation-type-page';

@Injectable({
  providedIn: 'root'
})
export class ExamObligationTypeService extends  BaseService{
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/examObligationTypes`, http);
  }

  createExamObligationType(examObligationType: ExamObligationType): Observable<number> {
    const { name } = examObligationType;

    return this.create({name});
  }

  getExamObligationTypes(): Observable<ExamObligationTypePage> {
    return this.http.get<ExamObligationTypePage>(`${environment.apiUrl}/examObligationTypes`, {headers: this.headers});
  }
}
