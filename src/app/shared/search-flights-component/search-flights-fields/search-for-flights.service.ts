import { Injectable } from '@angular/core';
import { SearchFlightsParameters } from './search-flights-parameters';
import { Flight } from '../../models/flight';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SearchForFlightsService {

  constructor(private http: HttpClient) { }

  search(parameters: SearchFlightsParameters): Observable<Array<Flight>>{
    let params = new HttpParams()
    .append('departureCity', parameters.departureCity)
    .append('destinationCity', parameters.destinationCity)
    .append('departureDate', parameters.departureDate.toString());

    return this.http.get<Array<Flight>>('/api/database/flights', {
      params: params
    });
  }

  get(): Observable<Array<Flight>>{
    return this.http.get<Array<Flight>>('/api/database/allflights');
  }

  add(flight: Flight): Observable<Flight>{
    return this.http.post<number>("/api/database/flight", flight)
    .pipe(
      map(resultValue => resultValue > -1 ? flight : null)
    )
  }

  delete(flight: Flight): Observable<Flight>{
    return this.http.post<Flight>("/api/database/deleteflight", flight);
  }
}
