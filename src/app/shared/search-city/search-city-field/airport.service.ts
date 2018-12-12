import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Flight } from '../../models/flight';
import { catchError, map } from 'rxjs/operators';
import { CustomError } from '../../custom-error';
import { Observable, throwError } from 'rxjs';
import { Airport } from '../../models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  search(cityName: string): Observable<Array<Flight>>{
    return this.http.get<Array<Flight>>(`/api/database/flights/${cityName}`)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
      map(flights => flights
        .map(flight => <Flight>{
          flightId: flight["flightId"],
          departureDate: flight["departureDate"],
          arrivalDate: flight["arrivalDate"],
          airlineName: flight["airlineName"],
          departureAirport: <Airport>{
            name: flight["departureAirportName"],
            city: flight["departureCity"],
            country: flight["departureCountry"]
          },
          destinationAirport: <Airport>{
            name: flight["destinationAirportName"],
            city: flight["destinationCity"],
            country: flight["destinationCountry"]
          }
        }))
    );
  }
}
