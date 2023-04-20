import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesFooterComponent } from './auth-pages-footer.component';

describe('AuthPagesFooterComponent', () => {
  let component: AuthPagesFooterComponent;
  let fixture: ComponentFixture<AuthPagesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPagesFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPagesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
