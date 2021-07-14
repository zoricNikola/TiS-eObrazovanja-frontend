import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamObligationComponent } from './exam-obligation.component';

describe('ExamObligationComponent', () => {
  let component: ExamObligationComponent;
  let fixture: ComponentFixture<ExamObligationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamObligationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
