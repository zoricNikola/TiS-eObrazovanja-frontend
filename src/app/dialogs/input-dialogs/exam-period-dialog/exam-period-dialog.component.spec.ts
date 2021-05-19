import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodDialogComponent } from './exam-period-dialog.component';

describe('ExamPeriodDialogComponent', () => {
  let component: ExamPeriodDialogComponent;
  let fixture: ComponentFixture<ExamPeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
