import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodSearchFormComponent } from './exam-period-search-form.component';

describe('ExamPeriodSearchFormComponent', () => {
  let component: ExamPeriodSearchFormComponent;
  let fixture: ComponentFixture<ExamPeriodSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
