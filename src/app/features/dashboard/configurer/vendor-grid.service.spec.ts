import { TestBed } from '@angular/core/testing';

import { VendorGridService } from './vendor-grid.service';

describe('VendorGridService', () => {
  let service: VendorGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
