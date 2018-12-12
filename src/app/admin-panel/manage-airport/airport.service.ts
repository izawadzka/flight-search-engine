import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Airport } from 'src/app/shared/models/airport';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CustomError } from 'src/app/shared/custom-error';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  add(airport: Airport):Observable<Airport>{
    const params = new HttpParams()
    .set("name", airport.name)
    .set("city", airport.city)
    .set("country", airport.country)
    .set("timezone", airport.timezone)
    .set("lattitude", airport.lattitude.toString())
    .set("longitude", airport.longitude.toString())
    .set("altitude", airport.altitude.toString())

    return this.http.post<number>("/api/database/airport", params)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
      map(result => result["returnValue"] > -1 ? airport : null)
      )
  }

  get():Observable<Array<Airport>>{
    return this.http.get<Array<Airport>>("/api/database/airports")
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
    );
  }
}
