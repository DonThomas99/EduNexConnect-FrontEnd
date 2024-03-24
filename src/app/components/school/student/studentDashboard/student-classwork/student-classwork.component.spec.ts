import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassworkComponent } from './student-classwork.component';

describe('StudentClassworkComponent', () => {
  let component: StudentClassworkComponent;
  let fixture: ComponentFixture<StudentClassworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentClassworkComponent]
    });
    fixture = TestBed.createComponent(StudentClassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
