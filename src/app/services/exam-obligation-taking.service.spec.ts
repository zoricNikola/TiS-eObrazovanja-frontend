import { TestBed } from '@angular/core/testing';

import { ExamObligationTakingService } from './exam-obligation-taking.service';

describe('ExamObligationTakingService', () => {
  let service: ExamObligationTakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamObligationTakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
