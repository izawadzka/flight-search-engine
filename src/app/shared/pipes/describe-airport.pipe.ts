import { Pipe, PipeTransform } from "@angular/core";
import { Airport } from "../models/airport";

@Pipe({
    name: 'describeAirport'
})
export class DescribeAirportPipe implements PipeTransform {
    transform(airport: Airport):string {
        let description = "";
        if(airport != null){
            description += airport.name && airport.name.length > 0 ? `${airport.name}, ` : "";
            description += airport.city && airport.city.length > 0 ? `${airport.city}, ` : "";
            description += airport.country && airport.country.length > 0 ? airport.country : ""; 
         }else{
             description = "not specified";
        }
        return description;
    }
}