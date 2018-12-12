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
import { RouterModule } from '@angular/router';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { AddFlightComponent } from './manage-flights/add-flight/add-flight.component';
import {MatSelectModule} from '@angular/material/select';
import { DisplayFlightsComponent } from './manage-flights/display-flights/display-flights.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ManageAirlineComponent,
    AddAirlineComponent,
    DisplayAirlinesComponent,
    ManageAirportComponent,
    AddAirportComponent,
    DisplayAirportsComponent,
    ManageFlightsComponent,
    AddFlightComponent,
    DisplayFlightsComponent
  ],
  imports: [
    SharedModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: 'admin', component: AdminPanelComponent, 
      children:[
        {path: '', redirectTo: 'flights', pathMatch: 'full'},
        {path: 'airlines', component: ManageAirlineComponent},
        {path: 'airports', component: ManageAirportComponent},
        {path: 'flights', component: ManageFlightsComponent}
      ]}
    ])
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule { }
