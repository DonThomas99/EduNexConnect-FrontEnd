import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterialsComponent } from './edit-materials.component';

describe('EditMaterialsComponent', () => {
  let component: EditMaterialsComponent;
  let fixture: ComponentFixture<EditMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaterialsComponent]
    });
    fixture = TestBed.createComponent(EditMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
