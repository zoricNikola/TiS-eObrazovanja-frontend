import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormDialogComponent } from './admin-form-dialog.component';

describe('AdminFormDialogComponent', () => {
  let component: AdminFormDialogComponent;
  let fixture: ComponentFixture<AdminFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
