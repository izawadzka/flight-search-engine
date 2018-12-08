import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFlightsFieldsComponent } from './shared/search-flights-component/search-flights-fields/search-flights-fields.component';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSortModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchForFlightsService } from './shared/search-flights-component/search-flights-fields/search-for-flights.service';
import { SearchFlightsComponent } from './shared/search-flights-component/search-flights.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SearchCityFieldComponent } from './shared/search-city/search-city-field/search-city-field.component';
import { SearchCityComponent } from './shared/search-city/search-city.component';
import { MainPanelComponent } from './main-panel/main-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsFieldsComponent,
    SearchFlightsComponent,
    SearchCityFieldComponent,
    SearchCityComponent,
    MainPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [SearchForFlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
