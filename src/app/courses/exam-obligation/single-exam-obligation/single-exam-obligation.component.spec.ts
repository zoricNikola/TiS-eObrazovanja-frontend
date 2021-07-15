import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExamObligationComponent } from './single-exam-obligation.component';

describe('SingleExamObligationComponent', () => {
  let component: SingleExamObligationComponent;
  let fixture: ComponentFixture<SingleExamObligationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExamObligationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExamObligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
