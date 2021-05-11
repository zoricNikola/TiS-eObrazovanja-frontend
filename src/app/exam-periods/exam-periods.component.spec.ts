import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodsComponent } from './exam-periods.component';

describe('ExamPeriodsComponent', () => {
  let component: ExamPeriodsComponent;
  let fixture: ComponentFixture<ExamPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
