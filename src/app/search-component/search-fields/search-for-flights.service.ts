import { Injectable } from '@angular/core';
import { SearchParameters } from './search-parameters';
import { Flight } from '../../shared/models/flight';
import { Observable, of } from 'rxjs';
import dateformat = require('dateformat');



@Injectable({
  providedIn: 'root'
})
export class SearchForFlightsService {

  constructor() { }
  search(parameters: SearchParameters): Observable<Array<Flight>>{
    //todo
    return of([]);
  }
}
