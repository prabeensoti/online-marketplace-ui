import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStatusViewComponent } from './page-status-view.component';

describe('PageStatusViewComponent', () => {
  let component: PageStatusViewComponent;
  let fixture: ComponentFixture<PageStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStatusViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
