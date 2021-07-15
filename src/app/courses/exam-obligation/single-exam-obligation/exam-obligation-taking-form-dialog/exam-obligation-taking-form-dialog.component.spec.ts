import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamObligationTakingFormDialogComponent } from './exam-obligation-taking-form-dialog.component';

describe('ExamObligationTakingFormDialogComponent', () => {
  let component: ExamObligationTakingFormDialogComponent;
  let fixture: ComponentFixture<ExamObligationTakingFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamObligationTakingFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamObligationTakingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
