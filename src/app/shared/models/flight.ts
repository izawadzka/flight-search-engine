import { Airport } from "./airport";

export interface Flight{
    departureDate: Date,
    arrivalDate: Date,
    airlineName: string,
    departureAirport: Airport,
    destinationAirport: Airport
}