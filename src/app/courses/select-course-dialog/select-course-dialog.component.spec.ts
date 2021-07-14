import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseDialogComponent } from './select-course-dialog.component';

describe('SelectCourseDialogComponent', () => {
  let component: SelectCourseDialogComponent;
  let fixture: ComponentFixture<SelectCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCourseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
