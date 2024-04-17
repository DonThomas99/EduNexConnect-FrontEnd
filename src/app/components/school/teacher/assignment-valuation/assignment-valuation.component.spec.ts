import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentValuationComponent } from './assignment-valuation.component';

describe('AssignmentValuationComponent', () => {
  let component: AssignmentValuationComponent;
  let fixture: ComponentFixture<AssignmentValuationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentValuationComponent]
    });
    fixture = TestBed.createComponent(AssignmentValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
