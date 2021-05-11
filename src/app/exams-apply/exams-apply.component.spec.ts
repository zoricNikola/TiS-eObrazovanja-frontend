import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsApplyComponent } from './exams-apply.component';

describe('ExamsApplyComponent', () => {
  let component: ExamsApplyComponent;
  let fixture: ComponentFixture<ExamsApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
