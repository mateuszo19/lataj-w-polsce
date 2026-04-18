/**
 * Type definitions for the flight training platform
 * @module lib/types
 */

/**
 * Type of training organization
 */
export type LocationType = "aeroklub" | "ato" | "dto";

/**
 * Available pilot training types
 */
export type TrainingType =
  | "LAPL(A)"
  | "PPL(A)"
  | "CPL(A)"
  | "ATPL(A)"
  | "CB-IR(A)"
  | "EIR"
  | "IR(A)"
  | "MEP(A)"
  | "SET"
  | "NVFR"
  | "UPRT"
  | "LAPL(H)"
  | "PPL(H)"
  | "CPL(H)"
  | "ATPL(H)"
  | "IR(H)"
  | "LAPL(S)"
  | "SPL"
  | "GLIDER"
  | "ULM"
  | "LAPL(B)"
  | "BPL"
  | "FI(A)"
  | "FI(H)"
  | "FI(S)"
  | "FI(B)"
  | "IRI(A)"
  | "CRI"
  | "TRI"
  | "SFI"
  | "FSTD"
  | "night"
  | "acro"
  | "towing";

/**
 * Supported languages for training
 */
export type Language = "polski" | "angielski" | "niemiecki" | "rosyjski";

/**
 * Training mode options
 */
export type TrainingMode = "theory" | "practice" | "both";

/**
 * Price level indicator (1-3)
 */
export type PriceLevel = 1 | 2 | 3;

/**
 * Training course details
 */
export interface Training {
  /** Type of license/rating being trained for */
  type: TrainingType;
  /** Training delivery mode */
  mode: TrainingMode;
  /** Languages in which training is available */
  languages: Language[];
  /** Optional price in PLN */
  price?: number;
}

/**
 * Aircraft fleet information
 */
export interface Aircraft {
  /** Aircraft model/type */
  type: string;
  /** Number of aircraft available */
  count: number;
  /** Optional registration markings */
  registration?: string;
}

/**
 * Contact information for a location
 */
export interface ContactInfo {
  /** Email address */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Website URL */
  website?: string;
  /** Physical address */
  address?: string;
}

/**
 * Training location (aeroclub, ATO, or DTO)
 */
export interface Location {
  /** Unique identifier */
  id: string;
  /** Organization name */
  name: string;
  /** Type of organization */
  type: LocationType;
  /** Geographic coordinates [longitude, latitude] */
  coordinates: [number, number];
  /** Available training courses */
  trainings: Training[];
  /** Price level indicator */
  priceLevel: PriceLevel;
  /** Available aircraft fleet */
  aircraft: Aircraft[];
  /** Contact information */
  contact: ContactInfo;
  /** ICAO airport code (if applicable) */
  icao?: string;
}