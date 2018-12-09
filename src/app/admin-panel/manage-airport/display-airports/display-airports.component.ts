import { Component, OnInit } from '@angular/core';
import { AirportService } from '../airport.service';
import { Airport } from 'src/app/shared/models/airport';

@Component({
  selector: 'app-display-airports',
  templateUrl: './display-airports.component.html',
  styleUrls: ['./display-airports.component.css']
})
export class DisplayAirportsComponent implements OnInit {
  airports: Array<Airport>;

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.airportService.get().subscribe(
      airports => this.airports = airports,
      err => console.log(err) 
    );
  }

  concat(param: string, ...params : Array<string>): string{
    let result = param + ",";

    for(let s of params){
      result += ` ${s},`;
    }
    return result.substr(0, result.length-1);
  }

  createGeoDescription(latt: string, long: string, alt: string): string{
    return `latt.: ${latt}, long.: ${long}, alt.: ${alt}`;
  }
}
