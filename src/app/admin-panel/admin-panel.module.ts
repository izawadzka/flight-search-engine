import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminPanelComponent } from './admin-panel.component';
import { ManageAirlineComponent } from './manage-airline/manage-airline.component';
import { AddAirlineComponent } from './manage-airline/add-airline/add-airline.component';
import { DisplayAirlinesComponent } from './manage-airline/display-airlines/display-airlines.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ManageAirportComponent } from './manage-airport/manage-airport.component';
import { AddAirportComponent } from './manage-airport/add-airport/add-airport.component';
import { DisplayAirportsComponent } from './manage-airport/display-airports/display-airports.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ManageAirlineComponent,
    AddAirlineComponent,
    DisplayAirlinesComponent,
    ManageAirportComponent,
    AddAirportComponent,
    DisplayAirportsComponent
  ],
  imports: [
    SharedModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule { }
