import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminComponent } from './manage-admin.component';

describe('AddAdminComponent', () => {
  let component: ManageAdminComponent;
  let fixture: ComponentFixture<ManageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAdminComponent]
    });
    fixture = TestBed.createComponent(ManageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
