import { Component, ViewChild } from '@angular/core';
import { Flight } from '../models/flight';
import { ServerResponse } from '../server-response';
import {MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'search-flights-component',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent{
  displayedColumns: string[] = ["position", "departureDate", "arrivalDate", "departureAirport", "destinationAirport", "airlineName"];
  dataSource: MatTableDataSource<Flight>;

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  onResponseFromServer(serverResponse: ServerResponse<Flight>){
    if(!serverResponse.hasError()){
      this.dataSource = new MatTableDataSource(serverResponse.getValues());
      this.dataSource.sort = this.sort;
    }  //todo: else
  }
}
