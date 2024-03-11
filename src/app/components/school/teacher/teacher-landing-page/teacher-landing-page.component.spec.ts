import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLandingPageComponent } from './teacher-landing-page.component';

describe('TeacherLandingPageComponent', () => {
  let component: TeacherLandingPageComponent;
  let fixture: ComponentFixture<TeacherLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherLandingPageComponent]
    });
    fixture = TestBed.createComponent(TeacherLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
