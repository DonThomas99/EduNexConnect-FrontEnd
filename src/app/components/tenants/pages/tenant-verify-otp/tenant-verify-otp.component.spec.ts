import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantVerifyOtpComponent } from './tenant-verify-otp.component';

describe('TenantVerifyOtpComponent', () => {
  let component: TenantVerifyOtpComponent;
  let fixture: ComponentFixture<TenantVerifyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantVerifyOtpComponent]
    });
    fixture = TestBed.createComponent(TenantVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
