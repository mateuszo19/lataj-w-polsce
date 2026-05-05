import {Aircraft, AircraftCategory} from "@/app/lib/types";

/**
 * Groups aircraft by category and type
 * @param aircraft - Array of aircraft to group
 * @returns Map with category as key, containing nested map with aircraft type as key and array of aircraft as value
 */
function groupAircraftByCategory(aircraft: Aircraft[]): Map<AircraftCategory, Map<string, Aircraft[]>> {
    const grouped = new Map<AircraftCategory, Map<string, Aircraft[]>>();

    aircraft.forEach(ac => {
        if (!grouped.has(ac.category)) {
            grouped.set(ac.category, new Map());
        }
        const categoryMap = grouped.get(ac.category)!;

        if (!categoryMap.has(ac.type)) {
            categoryMap.set(ac.type, []);
        }
        categoryMap.get(ac.type)!.push(ac);
    });

    return grouped;
};

export default groupAircraftByCategory;