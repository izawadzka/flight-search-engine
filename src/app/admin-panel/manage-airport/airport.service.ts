import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Airport } from 'src/app/shared/models/airport';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  add(airport: Airport):Observable<Airport>{
    return this.http.post<number>("/api/database/airport", airport)
    .pipe(
      map(resultValue => resultValue > -1 ? airport : null)
      )
  }

  get():Observable<Array<Airport>>{
    return this.http.get<Array<Airport>>("/api/database/airports")
  }
}
