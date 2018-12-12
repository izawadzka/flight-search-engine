import { Injectable } from '@angular/core';
import { SearchFlightsParameters } from './search-flights-parameters';
import { Flight } from '../../models/flight';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CustomError } from '../../custom-error';



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
    }).pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status)))
      )
  }

  get(): Observable<Array<Flight>>{
    return this.http.get<Array<Flight>>('/api/database/allflights')
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status)))
      )
  }

  add(flight: Flight): Observable<Flight>{
    const params = new HttpParams()
    .set("airlineName", flight.airlineName)
    .set("departureAirportName", flight.departureAirport.name)
    .set("departureAirportCity", flight.departureAirport.city)
    .set("departureAirportCountry", flight.departureAirport.country)
    .set("destinationAirportName", flight.destinationAirport.name)
    .set("destinationAirportCity", flight.destinationAirport.city)
    .set("destinationAirportCountry", flight.destinationAirport.country)
    .set("departureDate", flight.departureDate.toString())
    .set("arrivalDate", flight.arrivalDate.toString())

    return this.http.post<number>("/api/database/flight", params)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
      map(result => result["returnValue"] > -1 ? flight : null)
    )
  }

  delete(flight: Flight): Observable<Flight>{
    const params = new HttpParams()
    .set("flightId", flight.flightId.toString())
    return this.http.post<Flight>("/api/database/deleteflight", params)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
      map(result => result["returnValue"] > -1 ? flight : null)
    )
  }
}
