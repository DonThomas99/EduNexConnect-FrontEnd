import { TestBed } from '@angular/core/testing';

import { TenantInterceptorInterceptor } from './tenant-interceptor.interceptor';

describe('TenantInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TenantInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TenantInterceptorInterceptor = TestBed.inject(TenantInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
