import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SearchForFlightsService } from 'src/app/shared/search-flights-component/search-flights-fields/search-for-flights.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseHandler } from 'src/app/shared/response-handler';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css']
})
export class DisplayFlightsComponent implements OnInit {
  displayedColumns: string[] = ["position", "departureDate", "arrivalDate", "departureAirport", "destinationAirport", "airlineName"];
  dataSource: MatTableDataSource<Flight>;

  @ViewChild(MatSort) sort: MatSort;

  private responseHandler: ResponseHandler;

  constructor(private flightsService: SearchForFlightsService,
    private toastr: ToastrService) { 
      this.responseHandler = new ResponseHandler(toastr);
    }

  ngOnInit() {
    this.flightsService.get().subscribe(
      flights => {
        this.dataSource = new MatTableDataSource(flights);
        this.dataSource.sort = this.sort;
      },
      err => this.responseHandler.showError("load flights", err)
    )
  }

  deleteFlight(flight : Flight){
    this.flightsService.delete(flight).subscribe(
      result => {
        if(!result) this.responseHandler.showError("delete flight")
        else this.responseHandler.showSuccess("deleted flight")
      },
      err => this.responseHandler.showError("delete flight", err)
    )
  }
}
