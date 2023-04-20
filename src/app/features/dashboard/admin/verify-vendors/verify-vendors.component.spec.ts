import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyVendorsComponent } from './verify-vendors.component';

describe('VerifyVendorsComponent', () => {
  let component: VerifyVendorsComponent;
  let fixture: ComponentFixture<VerifyVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
