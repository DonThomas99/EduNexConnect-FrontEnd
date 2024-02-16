import { TestBed } from '@angular/core/testing';

import { SchoolAdminService } from './school-admin.service';

describe('SchoolAdminService', () => {
  let service: SchoolAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
