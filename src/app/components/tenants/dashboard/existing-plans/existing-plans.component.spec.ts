import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPlansComponent } from './existing-plans.component';

describe('ExistingPlansComponent', () => {
  let component: ExistingPlansComponent;
  let fixture: ComponentFixture<ExistingPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistingPlansComponent]
    });
    fixture = TestBed.createComponent(ExistingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
