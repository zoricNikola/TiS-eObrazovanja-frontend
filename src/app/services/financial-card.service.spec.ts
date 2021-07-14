import { TestBed } from '@angular/core/testing';

import { FinancialCardService } from './financial-card.service';

describe('FinancialCardService', () => {
  let service: FinancialCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
