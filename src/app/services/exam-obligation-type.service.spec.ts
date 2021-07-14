import { TestBed } from '@angular/core/testing';

import { ExamObligationTypeService } from './exam-obligation-type.service';

describe('ExamObligationTypeService', () => {
  let service: ExamObligationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamObligationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
