import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlatformPageComponent } from './pricing-platform-page.component';

describe('PricingPlatformPageComponent', () => {
  let component: PricingPlatformPageComponent;
  let fixture: ComponentFixture<PricingPlatformPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingPlatformPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPlatformPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
