import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseEnrollmentDialogComponent } from './select-course-enrollment-dialog.component';

describe('SelectCourseEnrollmentDialogComponent', () => {
  let component: SelectCourseEnrollmentDialogComponent;
  let fixture: ComponentFixture<SelectCourseEnrollmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCourseEnrollmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourseEnrollmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
