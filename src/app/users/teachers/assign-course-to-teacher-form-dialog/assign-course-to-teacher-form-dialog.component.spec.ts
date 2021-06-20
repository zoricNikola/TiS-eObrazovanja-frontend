import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseToTeacherFormDialogComponent } from './assign-course-to-teacher-form-dialog.component';

describe('AssignCourseToTeacherFormDialogComponent', () => {
  let component: AssignCourseToTeacherFormDialogComponent;
  let fixture: ComponentFixture<AssignCourseToTeacherFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourseToTeacherFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourseToTeacherFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
