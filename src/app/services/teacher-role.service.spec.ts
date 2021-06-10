import { TestBed } from '@angular/core/testing';

import { TeacherRoleService } from './teacher-role.service';

describe('TeacherRoleService', () => {
  let service: TeacherRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
