import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchForFlightsService } from './shared/search-flights-component/search-flights-fields/search-for-flights.service';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { MainPanelModule } from './main-panel/main-panel.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { RouterModule } from '@angular/router';
import { MainPanelComponent } from './main-panel/main-panel.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    MainPanelModule,
    AdminPanelModule,
    RouterModule.forRoot([], {useHash: true})
  ],
  providers: [SearchForFlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
