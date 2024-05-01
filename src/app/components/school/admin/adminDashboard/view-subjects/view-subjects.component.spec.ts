import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectsComponent } from './view-subjects.component';

describe('ViewSubjectsComponent', () => {
  let component: ViewSubjectsComponent;
  let fixture: ComponentFixture<ViewSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubjectsComponent]
    });
    fixture = TestBed.createComponent(ViewSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
