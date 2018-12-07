import { Injectable } from '@angular/core';
import { SearchParameters } from './search-parameters';
import { Flight } from '../../models/flight';
import { Observable, of } from 'rxjs';
import dateformat = require('dateformat');
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SearchForFlightsService {

  constructor(private http: HttpClient) { }

  search(parameters: SearchParameters): Observable<Array<Flight>>{
    let params = new HttpParams()
    .append('departureCity', parameters.departureCity)
    .append('destinationCity', parameters.destinationCity)
    .append('departureDate', parameters.departureDate.toString());

    return this.http.get<Array<Flight>>('/api/database/flights', {
      params: params
    });
  }
}
