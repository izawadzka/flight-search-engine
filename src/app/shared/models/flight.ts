import { Airport } from "./airport";

export interface Flight{
    flightId: number,
    departureDate: Date,
    arrivalDate: Date,
    airlineName: string,
    departureAirport: Airport,
    destinationAirport: Airport
}