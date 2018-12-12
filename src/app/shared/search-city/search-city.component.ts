import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Flight } from '../models/flight';
import { ServerResponse } from '../server-response';

@Component({
  selector: 'search-airport-component',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent{
  displayedColumns: string[] = ["position", "departureDate", "arrivalDate", "departureAirport", "destinationAirport", "airlineName"];
  dataSource: MatTableDataSource<Flight>;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  onResponseFromServer(serverResponse: ServerResponse<Flight>){
    if(!serverResponse.hasError()){
      this.dataSource = new MatTableDataSource(serverResponse.getValues());
      this.dataSource.sort = this.sort;
    }  //todo: else
  }
}
