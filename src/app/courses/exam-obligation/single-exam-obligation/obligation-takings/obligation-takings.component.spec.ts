import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationTakingsComponent } from './obligation-takings.component';

describe('ObligationTakingsComponent', () => {
  let component: ObligationTakingsComponent;
  let fixture: ComponentFixture<ObligationTakingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligationTakingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationTakingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
