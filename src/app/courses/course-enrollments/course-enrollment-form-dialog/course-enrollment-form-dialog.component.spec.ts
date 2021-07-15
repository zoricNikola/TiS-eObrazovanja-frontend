import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollmentFormDialogComponent } from './course-enrollment-form-dialog.component';

describe('CourseEnrollmentFormDialogComponent', () => {
  let component: CourseEnrollmentFormDialogComponent;
  let fixture: ComponentFixture<CourseEnrollmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEnrollmentFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrollmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
