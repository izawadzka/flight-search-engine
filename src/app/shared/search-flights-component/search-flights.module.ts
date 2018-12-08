import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SearchFlightsFieldsComponent } from './search-flights-fields/search-flights-fields.component';
import { SearchFlightsComponent } from './search-flights.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    SearchFlightsFieldsComponent,
    SearchFlightsComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    SearchFlightsComponent
  ]
})
export class SearchFlightsModule { }
