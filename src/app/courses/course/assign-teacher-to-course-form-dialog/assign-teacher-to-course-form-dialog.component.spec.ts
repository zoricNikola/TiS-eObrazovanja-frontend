import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeacherToCourseFormDialogComponent } from './assign-teacher-to-course-form-dialog.component';

describe('AssignTeacherToCourseFormDialogComponent', () => {
  let component: AssignTeacherToCourseFormDialogComponent;
  let fixture: ComponentFixture<AssignTeacherToCourseFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTeacherToCourseFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeacherToCourseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
