import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWidgetsComponent } from './top-widgets.component';

describe('TopWidgetsComponent', () => {
  let component: TopWidgetsComponent;
  let fixture: ComponentFixture<TopWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopWidgetsComponent]
    });
    fixture = TestBed.createComponent(TopWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
