import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportNMessagesComponent } from './support-n-messages.component';

describe('SupportNMessagesComponent', () => {
  let component: SupportNMessagesComponent;
  let fixture: ComponentFixture<SupportNMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportNMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportNMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
