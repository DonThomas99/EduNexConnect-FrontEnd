import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminComponent } from './create-admin.component';

describe('CreateAdminComponent', () => {
  let component: CreateAdminComponent;
  let fixture: ComponentFixture<CreateAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdminComponent]
    });
    fixture = TestBed.createComponent(CreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
