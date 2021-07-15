import { TestBed } from '@angular/core/testing';

import { TeacherAuthGuardService } from './teacher-auth-guard.service';

describe('TeacherAuthGuardService', () => {
  let service: TeacherAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
