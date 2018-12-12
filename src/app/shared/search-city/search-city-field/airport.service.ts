import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Flight } from '../../models/flight';
import { catchError } from 'rxjs/operators';
import { CustomError } from '../../custom-error';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  search(cityName: string): Observable<Array<Flight>>{
    return this.http.get<Array<Flight>>(`/api/database/flights/${cityName}`)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
    );
  }
}
