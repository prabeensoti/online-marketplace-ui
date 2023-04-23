import { TestBed } from '@angular/core/testing';

import { VendorOrderGridService } from './vendor-order-grid.service';

describe('VendorOrderGridService', () => {
  let service: VendorOrderGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorOrderGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
