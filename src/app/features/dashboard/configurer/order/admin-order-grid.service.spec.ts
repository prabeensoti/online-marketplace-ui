import { TestBed } from '@angular/core/testing';

import { AdminOrderGridService } from './admin-order-grid.service';

describe('AdminOrderGridService', () => {
  let service: AdminOrderGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrderGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
