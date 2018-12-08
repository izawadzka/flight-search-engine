import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Flight } from '../models/flight';
import { ServerResponse } from '../server-response';
import { Airport } from '../models/airport';

@Component({
  selector: 'app-search-airport',
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

  getAirportDescription(airport: Airport){
    let description = "";
    if(airport != null){
      description += airport.name && airport.name.length > 0 ? `${airport.name} in` : "";
      description += airport.city && airport.city.length > 0 ? `${airport.city},` : "";
      description += airport.country && airport.country.length > 0 ? airport.country : ""; 
    }else{
      description = "not specified";
    }

    return description;
  }
}
