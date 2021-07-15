import { TestBed } from '@angular/core/testing';

import { AdminTeacherAuthGuardService } from './admin-teacher-auth-guard.service';

describe('AdminTeacherAuthGuardService', () => {
  let service: AdminTeacherAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTeacherAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
