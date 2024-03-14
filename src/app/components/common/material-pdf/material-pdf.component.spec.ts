import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPdfComponent } from './material-pdf.component';

describe('MaterialPdfComponent', () => {
  let component: MaterialPdfComponent;
  let fixture: ComponentFixture<MaterialPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialPdfComponent]
    });
    fixture = TestBed.createComponent(MaterialPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
