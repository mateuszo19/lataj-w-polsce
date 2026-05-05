"use client";

import { TrainingType, Language, AircraftCategory } from "@/app/lib/types";
import trainingTypeLabels from "@/app/const/trainingTypeLabels";
import categoryLabels from "@/app/const/categoryLabels";
import languageLabels from "@/app/const/languageLabels";

/**
 * Filter state interface
 */
export interface FilterState {
  selectedTrainingTypes: Set<TrainingType>;
  minPrice: number;
  maxPrice: number;
  hideWithoutPrice: boolean;
  selectedAircraftCategories: Set<AircraftCategory>;
  selectedLanguages: Set<Language>;
}

/**
 * Props for the Filters component
 */
interface FiltersProps {
  show: boolean;
  availableTrainingTypes: TrainingType[];
  availableLanguages: Language[];
  priceRange: { min: number; max: number };
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClear: () => void;
}

/**
 * Filters panel component with training type, price, aircraft and language filters
 */
export default function Filters({
  show,
  availableTrainingTypes,
  availableLanguages,
  priceRange,
  filters,
  onFiltersChange,
  onClear
}: FiltersProps) {
  if (!show) return null;

  const activeFiltersCount =
    filters.selectedTrainingTypes.size +
    filters.selectedAircraftCategories.size +
    filters.selectedLanguages.size +
    (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max ? 1 : 0) +
    (filters.hideWithoutPrice ? 1 : 0);

  const toggleTrainingType = (type: TrainingType) => {
    const newSet = new Set(filters.selectedTrainingTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    onFiltersChange({ ...filters, selectedTrainingTypes: newSet });
  };

  const toggleAircraftCategory = (cat: AircraftCategory) => {
    const newSet = new Set(filters.selectedAircraftCategories);
    if (newSet.has(cat)) {
      newSet.delete(cat);
    } else {
      newSet.add(cat);
    }
    onFiltersChange({ ...filters, selectedAircraftCategories: newSet });
  };

  const toggleLanguage = (lang: Language) => {
    const newSet = new Set(filters.selectedLanguages);
    if (newSet.has(lang)) {
      newSet.delete(lang);
    } else {
      newSet.add(lang);
    }
    onFiltersChange({ ...filters, selectedLanguages: newSet });
  };

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 overflow-x-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Filtry</h3>
        {activeFiltersCount > 0 && (
          <button onClick={onClear} className="text-xs text-red-600 hover:text-red-700 font-medium">
            Wyczyść wszystkie
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-60 overflow-y-auto overflow-x-hidden">
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Rodzaje szkoleń</h4>
          <div className="flex flex-wrap gap-1">
            {availableTrainingTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleTrainingType(type)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                  filters.selectedTrainingTypes.has(type)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {trainingTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-gray-700">Cena</h4>
            <label className="flex items-center gap-1 text-[10px] text-gray-600">
              <input
                type="checkbox"
                checked={filters.hideWithoutPrice}
                onChange={(e) => onFiltersChange({ ...filters, hideWithoutPrice: e.target.checked })}
                className="w-3 h-3 rounded"
              />
              Ukryj bez ceny
            </label>
          </div>
          <div className="text-[10px] text-gray-500 mb-2">
            {filters.minPrice.toLocaleString()} - {filters.maxPrice.toLocaleString()} PLN
          </div>
          <div className="relative h-6 px-1">
            <div className="absolute top-1/2 left-1 right-1 h-1 bg-gray-200 -translate-y-1/2 rounded" />
            <div
              className="absolute top-1/2 h-1 bg-blue-500 -translate-y-1/2 rounded"
              style={{
                left: `calc(1px + ${((filters.minPrice - priceRange.min) / (priceRange.max - priceRange.min || 1)) * (100 - 2)}%)`,
                right: `calc(1px + ${100 - ((filters.maxPrice - priceRange.min) / (priceRange.max - priceRange.min || 1)) * (100 - 2)}%)`
              }}
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step="1000"
              value={filters.minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= filters.maxPrice) onFiltersChange({ ...filters, minPrice: val });
              }}
              className="absolute top-0 left-0 w-1/2 h-full -ml-1 appearance-none bg-transparent cursor-pointer"
              style={{ zIndex: 10 }}
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step="1000"
              value={filters.maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= filters.minPrice) onFiltersChange({ ...filters, maxPrice: val });
              }}
              className="absolute top-0 right-0 w-1/2 h-full mr-1 appearance-none bg-transparent cursor-pointer"
              style={{ zIndex: 10 }}
            />
            <button
              type="button"
              className="absolute top-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow -translate-y-1/2 -translate-x-1/2 hover:scale-110 active:scale-95 transition-transform z-20"
              style={{
                left: `calc(1px + ${((filters.minPrice - priceRange.min) / (priceRange.max - priceRange.min || 1)) * (100 - 2)}%)`
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                const input = e.currentTarget.previousElementSibling?.previousElementSibling as HTMLInputElement;
                if (input) {
                  input.focus();
                  input.click();
                }
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow -translate-y-1/2 -translate-x-1/2 hover:scale-110 active:scale-95 transition-transform z-20"
              style={{
                left: `calc(1px + ${((filters.maxPrice - priceRange.min) / (priceRange.max - priceRange.min || 1)) * (100 - 2)}%)`
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                const input = e.currentTarget.previousElementSibling?.previousElementSibling?.previousElementSibling?.previousElementSibling as HTMLInputElement;
                if (input) {
                  input.focus();
                  input.click();
                }
              }}
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Typ statku</h4>
          <div className="flex gap-2">
            {(["plane", "glider", "baloon"] as AircraftCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => toggleAircraftCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filters.selectedAircraftCategories.has(cat)
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Język szkolenia</h4>
          <div className="flex flex-wrap gap-1">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filters.selectedLanguages.has(lang)
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}