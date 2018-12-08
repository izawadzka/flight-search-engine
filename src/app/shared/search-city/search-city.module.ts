import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SearchCityFieldComponent } from './search-city-field/search-city-field.component';
import { SearchCityComponent } from './search-city.component';

@NgModule({
  declarations: [
    SearchCityFieldComponent,
    SearchCityComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchCityComponent
  ]
})
export class SearchCityModule { }
