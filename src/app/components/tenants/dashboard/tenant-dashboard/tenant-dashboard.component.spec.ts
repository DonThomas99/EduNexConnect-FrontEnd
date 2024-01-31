import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDashboardComponent } from './tenant-dashboard.component';

describe('TenantDashboardComponent', () => {
  let component: TenantDashboardComponent;
  let fixture: ComponentFixture<TenantDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantDashboardComponent]
    });
    fixture = TestBed.createComponent(TenantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
