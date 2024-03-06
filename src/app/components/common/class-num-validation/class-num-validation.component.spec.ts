import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassNumValidationComponent } from './class-num-validation.component';

describe('ClassNumValidationComponent', () => {
  let component: ClassNumValidationComponent;
  let fixture: ComponentFixture<ClassNumValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassNumValidationComponent]
    });
    fixture = TestBed.createComponent(ClassNumValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
