import { Component} from '@angular/core';
import { CustomErrorStateMatcher } from 'src/app/shared/custom-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { AirlineService } from '../airline.service';

const MIN_NAME_OR_COUNTRY_LENGHT = 2;
const MAX_NAME_OR_COUNTRY_LENGHT = 30;
const ALIAS_LENGTH = 3;

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent{
  matcher = new CustomErrorStateMatcher();

  validNameInfo = `At least ${MIN_NAME_OR_COUNTRY_LENGHT} chars, maximum ${MAX_NAME_OR_COUNTRY_LENGHT}`
  airlineNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_NAME_OR_COUNTRY_LENGHT),
    Validators.maxLength(MAX_NAME_OR_COUNTRY_LENGHT)
  ]);

  validAliasInfo = `${ALIAS_LENGTH} chars`
  aliasFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(ALIAS_LENGTH),
    Validators.maxLength(ALIAS_LENGTH)
  ]);

  validCountryInfo = `At least ${MIN_NAME_OR_COUNTRY_LENGHT} chars, maximum ${MAX_NAME_OR_COUNTRY_LENGHT}`
  countryFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(MIN_NAME_OR_COUNTRY_LENGHT),
    Validators.maxLength(MAX_NAME_OR_COUNTRY_LENGHT)
  ]);

  constructor(private airlineService: AirlineService) { }

  addAirline(){
    if(!this.airlineNameFormControl.hasError('required') 
    && !this.aliasFormControl.hasError('required') 
    && !this.countryFormControl.hasError('required')){
      document.getElementById("add-airline-button").setAttribute("disabled", "true");
      this.airlineService.add(
        this.airlineNameFormControl.value,
        this.aliasFormControl.value,
        this.countryFormControl.value)
        .subscribe(
          res=>{
            console.log(res);
            if(res == null){ //todo: display message
              console.log("Airline already exists");
            }
          },
          err => console.log(err),
          () => document.getElementById("add-airline-button").removeAttribute("disabled")
        )
    }//todo: else
  }

}
