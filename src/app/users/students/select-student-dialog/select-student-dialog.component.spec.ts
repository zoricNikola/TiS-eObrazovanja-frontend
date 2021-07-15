import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentDialogComponent } from './select-student-dialog.component';

describe('SelectStudentDialogComponent', () => {
  let component: SelectStudentDialogComponent;
  let fixture: ComponentFixture<SelectStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
