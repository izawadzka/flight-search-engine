import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Flight } from '../../models/flight';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  search(): Observable<Array<Flight>>{
    //todo
    return of([]);
  }
}
