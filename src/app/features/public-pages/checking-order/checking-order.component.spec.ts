import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingOrderComponent } from './checking-order.component';

describe('CheckingOrderComponent', () => {
  let component: CheckingOrderComponent;
  let fixture: ComponentFixture<CheckingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
