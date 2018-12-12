import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Airline } from 'src/app/shared/models/airline';
import {map, catchError} from 'rxjs/operators'
import { CustomError } from 'src/app/shared/custom-error';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http: HttpClient) { }

  add(airline: Airline): Observable<Airline>{
    const params = new HttpParams()
      .set("name", airline.name)
      .set("alias", airline.alias)
      .set("country", airline.country);

    return this.http.post<number>("/api/database/airline", params)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
      map(result => result["returnValue"] > -1 ? airline : null)
    )
  }

  get(): Observable<Array<Airline>>{
    return this.http.get<Array<Airline>>("/api/database/airlines")
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(new CustomError(err.status))),
    );
  }
}
