import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNListingComponent } from './search-n-listing.component';

describe('SearchNListingComponent', () => {
  let component: SearchNListingComponent;
  let fixture: ComponentFixture<SearchNListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
