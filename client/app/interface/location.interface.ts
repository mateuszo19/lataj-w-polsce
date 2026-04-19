/**
 * Training location (aeroclub, ATO, or DTO)
 */
export interface Location {
    /** Unique identifier */
    id: string;
    /** Organization name */
    name: string;
    /** DTO office number */
    dtoNumber: string;
    /** Type of organization */
    type: LocationType;
    /** ICAO airport code (optional - use instead of coordinates for airports) */
    icao?: string;
    /** Geographic coordinates [longitude, latitude] (optional - use if icao not provided) */
    coordinates?: [number, number];
    /** Available training courses */
    trainings: Training[];
    /** Price level indicator */
    priceLevel?: PriceLevel;
    /** Available aircraft fleet */
    aircraft: Aircraft[];
    /** Contact information */
    contact: ContactInfo;
}