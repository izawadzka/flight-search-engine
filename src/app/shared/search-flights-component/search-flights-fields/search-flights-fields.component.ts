import { Component, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { SearchFlightsParameters } from './search-flights-parameters';
import { ErrorStateMatcher } from '@angular/material/core';
import { SearchForFlightsService } from './search-for-flights.service';
import { Flight } from '../../models/flight';
import { ServerResponse } from '../../server-response';


const REQUIRED_MIN_LENGTH = 2;

@Component({
  selector: 'search-fields',
  templateUrl: './search-flights-fields.component.html',
  styleUrls: ['./search-flights-fields.component.css']
})
export class SearchFlightsFieldsComponent {
  errorMessage = `City has at least ${REQUIRED_MIN_LENGTH} characters`;

  pickedDateFormControl = new FormControl(new Date());
  minDate = new Date();

  departureCityFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(REQUIRED_MIN_LENGTH),
  ]);

  destinationCityFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(REQUIRED_MIN_LENGTH),
  ]);

  matcher = new CustomErrorStateMatcher();

  @Output() responseFromServer: EventEmitter<ServerResponse<Flight>> = new EventEmitter();
  
  constructor(private service: SearchForFlightsService) { }


  searchForFlights(){
    if(!this.destinationCityFormControl.hasError('required') && !this.departureCityFormControl.hasError('required')){
      document.querySelector(".searchButton").setAttribute("disabled", "true");
      this.service.search(<SearchFlightsParameters>{
        departureCity: this.departureCityFormControl.value,
        destinationCity: this.destinationCityFormControl.value,
        departureDate: new Date(this.pickedDateFormControl.value)
      }).subscribe(
        res => {
          document.querySelector(".searchButton").removeAttribute("disabled");
          this.responseFromServer.emit(new ServerResponse(res)); 
      }
    )
  }
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid);
  }
}
