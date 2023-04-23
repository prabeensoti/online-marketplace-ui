import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManageAllComponent } from './order-manage-all.component';

describe('OrderManageAllComponent', () => {
  let component: OrderManageAllComponent;
  let fixture: ComponentFixture<OrderManageAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManageAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManageAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
