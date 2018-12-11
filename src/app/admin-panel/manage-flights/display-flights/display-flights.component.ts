import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SearchForFlightsService } from 'src/app/shared/search-flights-component/search-flights-fields/search-for-flights.service';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css']
})
export class DisplayFlightsComponent implements OnInit {
  displayedColumns: string[] = ["position", "departureDate", "arrivalDate", "departureAirport", "destinationAirport", "airlineName"];
  dataSource: MatTableDataSource<Flight>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private flightsService: SearchForFlightsService) { }

  ngOnInit() {
    this.flightsService.get().subscribe(
      flights => {
        this.dataSource = new MatTableDataSource(flights);
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }

  deleteFlight(flight : Flight){
    this.flightsService.delete(flight).subscribe(
      result => {
        if(!result) console.log("Failed to delete flight")
        else console.log("Successfully deleted flight")
      },
      err => console.log(err)
    )
  }
}
