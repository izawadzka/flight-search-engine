import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/shared/models/airline';
import { AirlineService } from '../airline.service';

@Component({
  selector: 'app-display-airlines',
  templateUrl: './display-airlines.component.html',
  styleUrls: ['./display-airlines.component.css']
})
export class DisplayAirlinesComponent implements OnInit {
  airlines: Array<Airline>;

  constructor(private airlineService: AirlineService) { }

  ngOnInit() {
    this.airlineService.get().subscribe(
      airlines => this.airlines = airlines,
      err => console.log(err) 
    );
  }

  concatAliasAndCountry(airline: Airline): string{
    return `${airline.alias}, ${airline.country}`;
  }
}
