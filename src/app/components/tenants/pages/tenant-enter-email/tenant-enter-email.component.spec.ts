import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEnterEmailComponent } from './tenant-enter-email.component';

describe('TenantEnterEmailComponent', () => {
  let component: TenantEnterEmailComponent;
  let fixture: ComponentFixture<TenantEnterEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantEnterEmailComponent]
    });
    fixture = TestBed.createComponent(TenantEnterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
