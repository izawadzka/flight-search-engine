import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flights Search Engine';
  actionName = "Log in";

  constructor(private router: Router){}

  manageUser(){
  if(this.router.url == '/home'){
    this.router.navigate(['/admin']);
    this.actionName = "Log out";
  } 
  else{
    this.router.navigate(['/home']);
    this.actionName = "Log in";
  }
  }
}
