import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightsFieldsComponent } from './search-flights-fields.component';

describe('MainPageComponent', () => {
  let component: SearchFlightsFieldsComponent;
  let fixture: ComponentFixture<SearchFlightsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFlightsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFlightsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
