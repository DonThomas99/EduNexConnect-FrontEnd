import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPeopleComponent } from './teacher-people.component';

describe('TeacherPeopleComponent', () => {
  let component: TeacherPeopleComponent;
  let fixture: ComponentFixture<TeacherPeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherPeopleComponent]
    });
    fixture = TestBed.createComponent(TeacherPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
