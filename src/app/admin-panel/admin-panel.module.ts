import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminPanelComponent } from './admin-panel.component';
import { ManageAirlineComponent } from './manage-airline/manage-airline.component';
import { AddAirlineComponent } from './manage-airline/add-airline/add-airline.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ManageAirlineComponent,
    AddAirlineComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule { }
