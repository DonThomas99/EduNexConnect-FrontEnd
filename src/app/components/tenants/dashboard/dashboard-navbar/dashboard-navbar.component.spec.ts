import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavbarComponent } from './dashboard-navbar.component';

describe('DashboardNavbarComponent', () => {
  let component: DashboardNavbarComponent;
  let fixture: ComponentFixture<DashboardNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNavbarComponent]
    });
    fixture = TestBed.createComponent(DashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
