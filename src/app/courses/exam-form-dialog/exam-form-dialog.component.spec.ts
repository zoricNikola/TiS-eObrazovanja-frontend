import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFormDialogComponent } from './exam-form-dialog.component';

describe('ExamFormDialogComponent', () => {
  let component: ExamFormDialogComponent;
  let fixture: ComponentFixture<ExamFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
