import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentFormComponent } from './vendor-payment-form.component';

describe('VendorPaymentFormComponent', () => {
  let component: VendorPaymentFormComponent;
  let fixture: ComponentFixture<VendorPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPaymentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
