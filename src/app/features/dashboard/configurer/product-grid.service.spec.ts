import { TestBed } from '@angular/core/testing';

import { ProductGridAdminService } from './product-grid-admin.service';

describe('ProductGridService', () => {
  let service: ProductGridAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGridAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
