import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRoleFormDialogComponent } from './teacher-role-form-dialog.component';

describe('TeacherRoleFormDialogComponent', () => {
  let component: TeacherRoleFormDialogComponent;
  let fixture: ComponentFixture<TeacherRoleFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRoleFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRoleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
