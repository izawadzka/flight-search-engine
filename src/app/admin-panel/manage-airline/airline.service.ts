import { Injectable } from '@angular/core';
import { Observable, from} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Airline } from 'src/app/shared/models/airline';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http: HttpClient) { }

  add(airlineName: string, airlineAlias: string, country: string):Observable<Airline>{
    const newAirline = <Airline>{
      name: airlineName,
      alias: airlineAlias,
      country: country
    };

    return this.http.post<number>("/api/database/airline", newAirline)
    .pipe(
      map(resultValue => resultValue > -1 ? newAirline : null)
    )
  }
}
