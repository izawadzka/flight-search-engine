import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminPanelComponent } from './admin-panel.component';
import { ManageAirlineComponent } from './manage-airline/manage-airline.component';
import { AddAirlineComponent } from './manage-airline/add-airline/add-airline.component';
import { DisplayAirlinesComponent } from './manage-airline/display-airlines/display-airlines.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ManageAirlineComponent,
    AddAirlineComponent,
    DisplayAirlinesComponent
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
