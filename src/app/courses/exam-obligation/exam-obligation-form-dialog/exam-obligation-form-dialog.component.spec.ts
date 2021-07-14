import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamObligationFormDialogComponent } from './exam-obligation-form-dialog.component';

describe('ExamObligationFormDialogComponent', () => {
  let component: ExamObligationFormDialogComponent;
  let fixture: ComponentFixture<ExamObligationFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamObligationFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamObligationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
