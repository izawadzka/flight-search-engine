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
  
  cityNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(REQUIRED_MIN_LENGTH),
  ]);

  matcher = new CustomErrorStateMatcher();

  @Output() responseFromServer: EventEmitter<ServerResponse<Flight>> = new EventEmitter();

  constructor(private service: AirportService) { }

  searchForAirport(){
    if(!this.cityNameFormControl.hasError('required')){
      document.getElementById("searchForCityButton").setAttribute("disabled", "true");

      this.service.search(this.cityNameFormControl.value).subscribe(
        res => this.responseFromServer.emit(new ServerResponse(res)),
        err => this.responseFromServer.emit(new ServerResponse(null, err)),
        () => document.getElementById("searchForCityButton").removeAttribute("disabled")
      )
  }
}
}
