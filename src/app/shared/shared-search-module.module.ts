import { NgModule } from '@angular/core';
import { SearchFlightsModule } from './search-flights-component/search-flights.module';
import { SearchCityModule } from './search-city/search-city.module';
import { SearchCityComponent } from './search-city/search-city.component';
import { SearchFlightsComponent } from './search-flights-component/search-flights.component';

@NgModule({
  declarations: [],
  imports: [
    SearchFlightsModule,
    SearchCityModule
  ],
  exports:[
    SearchCityComponent,
    SearchFlightsComponent
  ]
})
export class SharedSearchModuleModule { }
