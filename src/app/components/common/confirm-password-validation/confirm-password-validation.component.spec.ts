import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordValidationComponent } from './confirm-password-validation.component';

describe('ConfirmPasswordValidationComponent', () => {
  let component: ConfirmPasswordValidationComponent;
  let fixture: ComponentFixture<ConfirmPasswordValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmPasswordValidationComponent]
    });
    fixture = TestBed.createComponent(ConfirmPasswordValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
