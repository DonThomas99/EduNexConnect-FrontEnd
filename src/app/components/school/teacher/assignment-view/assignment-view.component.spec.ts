import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentViewComponent } from './assignment-view.component';

describe('AssignmentViewComponent', () => {
  let component: AssignmentViewComponent;
  let fixture: ComponentFixture<AssignmentViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentViewComponent]
    });
    fixture = TestBed.createComponent(AssignmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
