import { Component, Output, EventEmitter} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../custom-error-state-matcher';
import { ServerResponse } from '../../server-response';
import { Flight } from '../../models/flight';
import { AirportService } from './airport.service';

const REQUIRED_MIN_LENGTH = 2;


@Component({
  selector: 'search-city-field',
  templateUrl: './search-city-field.component.html',
  styleUrls: ['./search-city-field.component.css']
})
export class SearchCityFieldComponent{
  errorMessage = `City has at least ${REQUIRED_MIN_LENGTH} characters`;
  
  airportNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(REQUIRED_MIN_LENGTH),
  ]);

  matcher = new CustomErrorStateMatcher();

  @Output() responseFromServer: EventEmitter<ServerResponse<Flight>> = new EventEmitter();

  constructor(private service: AirportService) { }

  searchForAirport(){
    if(!this.airportNameFormControl.hasError('required')){
      document.querySelector(".searchButton").setAttribute("disabled", "true");

      this.service.search().subscribe(
        res => {
          document.querySelector(".searchButton").removeAttribute("disabled");
          this.responseFromServer.emit(new ServerResponse(res)); 
      })
  }
}
}
