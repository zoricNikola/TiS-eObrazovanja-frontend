import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrollmentFormDialogComponent } from './student-enrollment-form-dialog.component';

describe('StudentEnrollmentFormDialogComponent', () => {
  let component: StudentEnrollmentFormDialogComponent;
  let fixture: ComponentFixture<StudentEnrollmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrollmentFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
