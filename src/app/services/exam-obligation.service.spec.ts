import { TestBed } from '@angular/core/testing';

import { ExamObligationService } from './exam-obligation.service';

describe('ExamObligationService', () => {
  let service: ExamObligationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamObligationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
