import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTeachingsComponent } from './teacher-teachings.component';

describe('TeacherTeachingsComponent', () => {
  let component: TeacherTeachingsComponent;
  let fixture: ComponentFixture<TeacherTeachingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherTeachingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTeachingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
