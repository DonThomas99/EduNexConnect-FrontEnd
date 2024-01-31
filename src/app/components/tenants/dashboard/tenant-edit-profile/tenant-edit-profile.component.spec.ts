import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEditProfileComponent } from './tenant-edit-profile.component';

describe('TenantEditProfileComponent', () => {
  let component: TenantEditProfileComponent;
  let fixture: ComponentFixture<TenantEditProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantEditProfileComponent]
    });
    fixture = TestBed.createComponent(TenantEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
