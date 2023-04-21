import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsFormComponent } from './vendor-details-form.component';

describe('VendorDetailsFormComponent', () => {
  let component: VendorDetailsFormComponent;
  let fixture: ComponentFixture<VendorDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
