import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodFormDialogComponent } from './exam-period-form-dialog.component';

describe('ExamPeriodFormDialogComponent', () => {
  let component: ExamPeriodFormDialogComponent;
  let fixture: ComponentFixture<ExamPeriodFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
