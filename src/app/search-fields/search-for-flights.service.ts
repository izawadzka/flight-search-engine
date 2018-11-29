import { Injectable } from '@angular/core';
import { SearchParameters } from './search-parameters';

@Injectable({
  providedIn: 'root'
})
export class SearchForFlightsService {

  constructor() { }
  search(parameters: SearchParameters){
    console.log(`Im searching for:`);
    console.log(parameters);
  }
}
