import { TestBed } from '@angular/core/testing';

import { SortParamsUtilsService } from './sort-params-utils.service';

describe('SortParamsUtilsService', () => {
  let service: SortParamsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortParamsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
