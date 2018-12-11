import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormatUTCDatePipe } from './pipes/format-utc-date.pipe';
import { DescribeAirportPipe } from './pipes/describe-airport.pipe';

@NgModule({
  declarations: [
    FormatUTCDatePipe,
    DescribeAirportPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormatUTCDatePipe,
    DescribeAirportPipe
  ]
})
export class SharedModule { }
