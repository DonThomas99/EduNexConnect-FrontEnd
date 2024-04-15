import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomCallComponent } from './zoom-call.component';

describe('ZoomCallComponent', () => {
  let component: ZoomCallComponent;
  let fixture: ComponentFixture<ZoomCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomCallComponent]
    });
    fixture = TestBed.createComponent(ZoomCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
