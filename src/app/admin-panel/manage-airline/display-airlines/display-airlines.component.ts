import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/shared/models/airline';
import { AirlineService } from '../airline.service';
import { ResponseHandler } from 'src/app/shared/response-handler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-airlines',
  templateUrl: './display-airlines.component.html',
  styleUrls: ['./display-airlines.component.css']
})
export class DisplayAirlinesComponent implements OnInit {
  airlines: Array<Airline>;

  constructor(private airlineService: AirlineService, private toastr: ToastrService) { }

  ngOnInit() {
    this.airlineService.get().subscribe(
      airlines => this.airlines = airlines,
      err => new ResponseHandler(this.toastr).showError("load airlines", err)
    );
  }

  concatAliasAndCountry(airline: Airline): string{
    return `${airline.alias}, ${airline.country}`;
  }
}
