import { Component, OnInit, AfterViewInit } from '@angular/core';

const AIRLINES_BUTTON_ID = "navigate-to-airlines-button";
const AIRPORTS_BUTTON_ID = "navigate-to-airports-button";
const FLIGHTS_BUTTON_ID = "navigate-to-flights-button";

const FOCUSED_BUTTON_COLOR = "#D9D9D9";
const UNFOCUSED_BUTTON_COLOR = "#F5F5F5";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements AfterViewInit{
  constructor() { }

  navigate(id: number){
    //not nice, but for now it is the best idea
    if(id == 1){
      document.getElementById(FLIGHTS_BUTTON_ID).style.background = FOCUSED_BUTTON_COLOR;
      document.getElementById(AIRLINES_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
      document.getElementById(AIRPORTS_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
    }
    if(id == 2){
      document.getElementById(AIRLINES_BUTTON_ID).style.background = FOCUSED_BUTTON_COLOR;
      document.getElementById(AIRPORTS_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
      document.getElementById(FLIGHTS_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
    }else if(id == 3){
      document.getElementById(AIRPORTS_BUTTON_ID).style.background = FOCUSED_BUTTON_COLOR;
      document.getElementById(AIRLINES_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
    }
  }

  ngAfterViewInit(){
    document.getElementById(AIRLINES_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
    document.getElementById(AIRPORTS_BUTTON_ID).style.background = UNFOCUSED_BUTTON_COLOR;
    document.getElementById(FLIGHTS_BUTTON_ID).style.background = FOCUSED_BUTTON_COLOR;
  }
}
