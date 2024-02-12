import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolhomeComponent } from './schoolhome.component';

describe('SchoolhomeComponent', () => {
  let component: SchoolhomeComponent;
  let fixture: ComponentFixture<SchoolhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolhomeComponent]
    });
    fixture = TestBed.createComponent(SchoolhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
