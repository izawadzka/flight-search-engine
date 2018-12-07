import { Component, ViewChild } from '@angular/core';
import { Flight } from '../models/flight';
import { ServerResponse } from '../server-response';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Airport } from '../models/airport';


@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
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
