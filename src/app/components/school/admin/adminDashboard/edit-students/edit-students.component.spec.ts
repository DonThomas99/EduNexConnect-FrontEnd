import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentsComponent } from './edit-students.component';

describe('EditStudentsComponent', () => {
  let component: EditStudentsComponent;
  let fixture: ComponentFixture<EditStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentsComponent]
    });
    fixture = TestBed.createComponent(EditStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
