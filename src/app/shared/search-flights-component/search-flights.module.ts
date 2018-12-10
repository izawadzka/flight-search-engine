import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SearchFlightsFieldsComponent } from './search-flights-fields/search-flights-fields.component';
import { SearchFlightsComponent } from './search-flights.component';

@NgModule({
  declarations: [
    SearchFlightsFieldsComponent,
    SearchFlightsComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    SearchFlightsComponent
  ]
})
export class SearchFlightsModule { }
