import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamObligationTypeComponent } from './exam-obligation-type.component';

describe('ExamObligationTypeComponent', () => {
  let component: ExamObligationTypeComponent;
  let fixture: ComponentFixture<ExamObligationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamObligationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamObligationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
