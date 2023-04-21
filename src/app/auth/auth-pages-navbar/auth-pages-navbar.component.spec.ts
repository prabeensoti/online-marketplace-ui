import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesNavbarComponent } from './auth-pages-navbar.component';

describe('AuthPagesNavbarComponent', () => {
  let component: AuthPagesNavbarComponent;
  let fixture: ComponentFixture<AuthPagesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPagesNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPagesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
