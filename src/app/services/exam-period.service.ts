import { Injectable } from '@angular/core';
import { FakeBackendService } from '../fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ExamPeriodService {

  constructor(private backend: FakeBackendService) { }

  getExamPeriods(){
    return this.backend.getExamPeriods();
  }
}
