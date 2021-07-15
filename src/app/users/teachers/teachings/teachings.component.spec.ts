import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingsComponent } from './teachings.component';

describe('TeachingsComponent', () => {
  let component: TeachingsComponent;
  let fixture: ComponentFixture<TeachingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
