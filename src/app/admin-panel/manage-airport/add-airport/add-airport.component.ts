import { Component} from '@angular/core';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { AirportService } from '../airport.service';
import { Airport } from 'src/app/shared/models/airport';

const MIN_NAME_OR_COUNTRY_LENGHT = 2;
const MAX_NAME_OR_COUNTRY_LENGHT = 30;

const MIN_TIMEZONE_LENGTH = 3;
const MAX_TIMEZONE_LENGTH = 10;

const MIN_GEO_DATA_LENGHT = 1;

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent{
  matcher = new CustomErrorStateMatcher();

  validWideFormInfo = `At least ${MIN_NAME_OR_COUNTRY_LENGHT} chars, max ${MAX_NAME_OR_COUNTRY_LENGHT}`;
  validTimezoneInfo = `At least ${MIN_TIMEZONE_LENGTH} chars, max ${MAX_TIMEZONE_LENGTH}`;
  validGeoDataInfo = `Number`;
  
  airportNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_NAME_OR_COUNTRY_LENGHT),
    Validators.maxLength(MAX_NAME_OR_COUNTRY_LENGHT)
  ]);
  cityFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_NAME_OR_COUNTRY_LENGHT),
    Validators.maxLength(MAX_NAME_OR_COUNTRY_LENGHT)
  ]);
  countryFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_NAME_OR_COUNTRY_LENGHT),
    Validators.maxLength(MAX_NAME_OR_COUNTRY_LENGHT)
  ]);
  timezoneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_TIMEZONE_LENGTH),
    Validators.maxLength(MAX_TIMEZONE_LENGTH)
  ]);

  lattitudeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_GEO_DATA_LENGHT)
  ]);
  longitudeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_GEO_DATA_LENGHT)
  ]);
  altitudeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_GEO_DATA_LENGHT)
  ]);

  constructor(private airportService: AirportService) { }

  addAirport(){
    if(this.areAllInputsValid()){
      document.getElementById("add-airport-button").setAttribute("disabled", "true");
      this.airportService.add(
        <Airport>{
          name: this.airportNameFormControl.value,
          city: this.cityFormControl.value,
          country: this.countryFormControl.value,
          timezone: this.timezoneFormControl.value,
          lattitude: this.lattitudeFormControl.value,
          longitude: this.longitudeFormControl.value,
          altitude: this.altitudeFormControl.value
        }
      ).subscribe(
        res => {
          if(res == null) console.log("Airport already exists")
          else console.log("Successfully added airport")
        },
        err =>{
          console.log(err);
          document.getElementById("add-airport-button").removeAttribute("disabled")
        },
        () => document.getElementById("add-airport-button").removeAttribute("disabled")
      )
    }
  }

  areAllInputsValid(): boolean{
    return !this.altitudeFormControl.hasError('required') 
    && !this.longitudeFormControl.hasError('required') 
    && !this.lattitudeFormControl.hasError('required')
    && !this.airportNameFormControl.hasError('required')
    && !this.cityFormControl.hasError('required')
    && !this.countryFormControl.hasError('required')
    && !this.timezoneFormControl.hasError('required')
  }
}
