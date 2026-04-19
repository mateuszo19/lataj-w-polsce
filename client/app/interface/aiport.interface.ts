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