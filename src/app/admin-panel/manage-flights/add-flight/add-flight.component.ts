import { Component, OnInit } from '@angular/core';
import { Airline} from 'src/app/shared/models/airline';
import { Airport } from 'src/app/shared/models/airport';
import { FormControl, Validators } from '@angular/forms';
import { AirlineService } from '../../manage-airline/airline.service';
import { SearchForFlightsService } from 'src/app/shared/search-flights-component/search-flights-fields/search-for-flights.service';
import { Flight } from 'src/app/shared/models/flight';
import { AirportService } from '../../manage-airport/airport.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  airlines: Array<Airline>;
  airports: Array<Airport>;

  pickedAirlineName: string;
  pickedDepartureAirport: Airport;
  pickedDestinationAirport: Airport;

  departureDateFormControl = new FormControl(new Date());
  departureTimeFormControl = new FormControl(new Date().toLocaleTimeString, [
    Validators.required,
    Validators.minLength(4)
  ])

  arrivalDateFormControl = new FormControl(new Date());
  arrivalTimeFormControl = new FormControl(new Date(), [
    Validators.required,
    Validators.minLength(4)
  ])
  minDate = new Date();
  
  

  constructor(private airlineService: AirlineService, 
    private airportService: AirportService, 
    private flightService: SearchForFlightsService) { }

  ngOnInit() {
    this.airlineService.get().subscribe(
      airlines => this.airlines = airlines,
      err => console.log(err)
    );

   this.airportService.get().subscribe(
      airports => this.airports = airports,
      err => console.log(err)
    )
  }

  addFlight(){
    this.flightService.add(<Flight>{
      departureDate: this.setTimeOnDate(this.departureTimeFormControl.value, this.departureDateFormControl.value),
      arrivalDate: this.setTimeOnDate(this.arrivalTimeFormControl.value, this.arrivalDateFormControl.value),
      airlineName: this.pickedAirlineName,
      departureAirport: this.pickedDepartureAirport,
      destinationAirport: this.pickedDestinationAirport
    }).subscribe( //todo: display toast with message
      res => {
        if(!res) console.log("Flight already exists")
        else console.log("Successfully added flight")
      },
      err => console.log(err)
    )
  }

  generateAirportDescription(airport: Airport): string{
    return `${airport.name}, ${airport.city}, ${airport.country}`;
  }

  setTimeOnDate(time: string, date: string): Date{
    let depHoursAndMins = time.split(":");
   
    return new Date(new Date(date)
    .setHours(+depHoursAndMins[0], +depHoursAndMins[1]))
  }
}
