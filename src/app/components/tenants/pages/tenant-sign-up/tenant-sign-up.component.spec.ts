import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSignUpComponent } from './tenant-sign-up.component';

describe('TenantSignUpComponent', () => {
  let component: TenantSignUpComponent;
  let fixture: ComponentFixture<TenantSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantSignUpComponent]
    });
    fixture = TestBed.createComponent(TenantSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
