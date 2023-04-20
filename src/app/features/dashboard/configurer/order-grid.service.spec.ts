import { TestBed } from '@angular/core/testing';

import { OrderGridService } from './order-grid.service';

describe('OrderGridService', () => {
  let service: OrderGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
