import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentDetailComponent } from './student-assignment-detail.component';

describe('StudentAssignmentDetailComponent', () => {
  let component: StudentAssignmentDetailComponent;
  let fixture: ComponentFixture<StudentAssignmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAssignmentDetailComponent]
    });
    fixture = TestBed.createComponent(StudentAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
