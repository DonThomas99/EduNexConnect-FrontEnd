import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubjectDetailPageComponent } from './student-subject-detail-page.component';

describe('StudentSubjectDetailPageComponent', () => {
  let component: StudentSubjectDetailPageComponent;
  let fixture: ComponentFixture<StudentSubjectDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSubjectDetailPageComponent]
    });
    fixture = TestBed.createComponent(StudentSubjectDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
