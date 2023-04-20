import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProductsComponent } from './verify-products.component';

describe('VerifyProductsComponent', () => {
  let component: VerifyProductsComponent;
  let fixture: ComponentFixture<VerifyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
