import { TestBed } from '@angular/core/testing';

import { TeachingService } from './teaching.service';

describe('TeachingsService', () => {
  let service: TeachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
