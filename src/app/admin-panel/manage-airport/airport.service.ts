import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Airport } from 'src/app/shared/models/airport';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      map(result => result["returnValue"] > -1 ? airport : null)
      )
  }

  get():Observable<Array<Airport>>{
    return this.http.get<Array<Airport>>("/api/database/airports")
  }
}
