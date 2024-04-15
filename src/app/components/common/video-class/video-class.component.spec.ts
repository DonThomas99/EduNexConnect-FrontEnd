import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoClassComponent } from './video-class.component';

describe('VideoClassComponent', () => {
  let component: VideoClassComponent;
  let fixture: ComponentFixture<VideoClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoClassComponent]
    });
    fixture = TestBed.createComponent(VideoClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
