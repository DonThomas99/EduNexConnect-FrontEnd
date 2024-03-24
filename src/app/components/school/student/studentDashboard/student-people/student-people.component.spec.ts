import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPeopleComponent } from './student-people.component';

describe('StudentPeopleComponent', () => {
  let component: StudentPeopleComponent;
  let fixture: ComponentFixture<StudentPeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPeopleComponent]
    });
    fixture = TestBed.createComponent(StudentPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
