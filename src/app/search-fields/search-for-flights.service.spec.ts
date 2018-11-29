import { TestBed } from '@angular/core/testing';

import { SearchForFlightsService } from './search-for-flights.service';

describe('SearchForFlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchForFlightsService = TestBed.get(SearchForFlightsService);
    expect(service).toBeTruthy();
  });
});
