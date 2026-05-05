import { Training } from "@/app/lib/types";

/**
 * Groups trainings by their type
 * @param trainings - Array of trainings to group
 * @returns Map with training type as key and array of trainings as value
 */
function groupTrainingsByType(trainings: Training[]): Map<string, Training[]> {
    const grouped = new Map<string, Training[]>();

    trainings.forEach(training => {
        if (!grouped.has(training.type)) {
            grouped.set(training.type, []);
        }
        grouped.get(training.type)!.push(training);
    });

    return grouped;
}

export default groupTrainingsByType;