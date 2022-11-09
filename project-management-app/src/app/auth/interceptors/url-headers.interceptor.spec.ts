import { TestBed } from '@angular/core/testing';

import { UrlHeadersInterceptor } from './url-headers.interceptor';

describe('UrlHeadersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UrlHeadersInterceptor,
    ],
  }));

  it('should be created', () => {
    const interceptor: UrlHeadersInterceptor = TestBed.inject(UrlHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
