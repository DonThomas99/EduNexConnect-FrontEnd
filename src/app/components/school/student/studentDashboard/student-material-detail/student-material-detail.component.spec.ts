import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMaterialDetailComponent } from './student-material-detail.component';

describe('StudentMaterialDetailComponent', () => {
  let component: StudentMaterialDetailComponent;
  let fixture: ComponentFixture<StudentMaterialDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMaterialDetailComponent]
    });
    fixture = TestBed.createComponent(StudentMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
