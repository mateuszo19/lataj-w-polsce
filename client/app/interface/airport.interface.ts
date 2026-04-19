import {AirportType} from "@/app/type/airport.type";
import {AirportSupportedVehiclesType} from "@/app/type/airportSupportedVehicles.type";

export interface Airport {
    id: number;
    type: AirportType;
    name: string;
    icao: string | null;
    supportedVehicles?: AirportSupportedVehiclesType[],
    reporter?: string | 'private';
    position: {
        latitude: number;
        longitude: number;
    }
}