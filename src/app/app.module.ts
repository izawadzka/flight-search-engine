import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchForFlightsService } from './shared/search-flights-component/search-flights-fields/search-for-flights.service';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { MainPanelModule } from './main-panel/main-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    MainPanelModule
  ],
  providers: [SearchForFlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
