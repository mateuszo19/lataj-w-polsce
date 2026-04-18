"use client";

import { useState } from "react";
import { LocationType, TrainingType, Language, TrainingMode, PriceLevel } from "../lib/types";

interface FilterPanelProps {
  filteredCount: number;
  totalCount: number;
  filterType: LocationType | "all";
  filterTraining: TrainingType[];
  filterLanguage: Language | "all";
  filterMode: TrainingMode | "all";
  filterPrice: PriceLevel | "all";
  activeFiltersCount: number;
  setFilterType: (value: LocationType | "all") => void;
  setFilterTraining: (value: TrainingType[]) => void;
  setFilterLanguage: (value: Language | "all") => void;
  setFilterMode: (value: TrainingMode | "all") => void;
  setFilterPrice: (value: PriceLevel | "all") => void;
  onClearFilters: () => void;
}

const allTrainingTypes: { value: TrainingType; label: string }[] = [
  { value: "LAPL(A)", label: "LAPL(A)" },
  { value: "PPL(A)", label: "PPL(A)" },
  { value: "CPL(A)", label: "CPL(A)" },
  { value: "ATPL(A)", label: "ATPL(A)" },
  { value: "CB-IR(A)", label: "CB-IR(A)" },
  { value: "EIR", label: "EIR" },
  { value: "IR(A)", label: "IR(A)" },
  { value: "MEP(A)", label: "MEP(A)" },
  { value: "SET", label: "SET" },
  { value: "NVFR", label: "NVFR" },
  { value: "UPRT", label: "UPRT" },
  { value: "LAPL(H)", label: "LAPL(H)" },
  { value: "PPL(H)", label: "PPL(H)" },
  { value: "CPL(H)", label: "CPL(H)" },
  { value: "ATPL(H)", label: "ATPL(H)" },
  { value: "IR(H)", label: "IR(H)" },
  { value: "LAPL(S)", label: "LAPL(S)" },
  { value: "SPL", label: "SPL" },
  { value: "GLIDER", label: "Szybowce" },
  { value: "ULM", label: "ULM" },
  { value: "LAPL(B)", label: "LAPL(B)" },
  { value: "BPL", label: "BPL" },
  { value: "FI(A)", label: "FI(A)" },
  { value: "FI(H)", label: "FI(H)" },
  { value: "FI(S)", label: "FI(S)" },
  { value: "FI(B)", label: "FI(B)" },
  { value: "IRI(A)", label: "IRI(A)" },
  { value: "CRI", label: "CRI" },
  { value: "TRI", label: "TRI" },
  { value: "SFI", label: "SFI" },
  { value: "FSTD", label: "FSTD / Symulator" },
  { value: "night", label: "Uprawnienie nocne" },
  { value: "acro", label: "Akrobacja" },
  { value: "towing", label: "Holowanie" }
];

const popularTrainings: { value: TrainingType; label: string }[] = [
  { value: "PPL(A)", label: "PPL(A)" },
  { value: "PPL(H)", label: "PPL(H)" },
  { value: "CPL(A)", label: "CPL(A)" },
  { value: "ATPL(A)", label: "ATPL(A)" },
  { value: "LAPL(A)", label: "LAPL(A)" },
  { value: "GLIDER", label: "Szybowce" },
  { value: "SPL", label: "SPL" },
  { value: "FI(A)", label: "FI(A)" },
  { value: "IR(A)", label: "IR(A)" },
  { value: "night", label: "Uprawnienie nocne" }
];

/**
 * Filter panel component for filtering flight training locations
 * Provides filters for organization type, training type, language, mode, and price level
 */
export default function FilterPanel({
  filteredCount,
  totalCount,
  filterType,
  filterTraining,
  filterLanguage,
  filterMode,
  filterPrice,
  activeFiltersCount,
  setFilterType,
  setFilterTraining,
  setFilterLanguage,
  setFilterMode,
  setFilterPrice,
  onClearFilters
}: FilterPanelProps) {
  const [showAllTrainings, setShowAllTrainings] = useState(false);

  const toggleTraining = (type: TrainingType | string) => {
    if (type === "all") {
      setFilterTraining([]);
      return;
    }

    const currentIndex = filterTraining.indexOf(type as TrainingType);
    const newTrainings = [...filterTraining];

    if (currentIndex === -1) {
      newTrainings.push(type as TrainingType);
    } else {
      newTrainings.splice(currentIndex, 1);
    }

    setFilterTraining(newTrainings);
  };

  const displayedTrainings = showAllTrainings ? allTrainingTypes : popularTrainings;
  const hasMoreTrainings = allTrainingTypes.length > popularTrainings.length;

  return (
    <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto z-10">
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-800">Lataj w polsce</h1>
            <span className="text-sm text-gray-500">({filteredCount} z {totalCount})</span>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Wyczyść filtry ({activeFiltersCount})
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Typ organizacji</label>
              <div className="flex flex-nowrap gap-2">
                {[
                  { value: "all", label: "Wszystkie", color: "gray" },
                  { value: "aeroklub", label: "Aerokluby", color: "violet" },
                  { value: "ato", label: "ATO", color: "emerald" },
                  { value: "dto", label: "DTO", color: "amber" }
                ].map(({ value, label, color }) => (
                    <button
                        key={value}
                        onClick={() => setFilterType(value as any)}
                        className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${filterType === value
                            ? `bg-${color}-500 text-white shadow-md`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                    >
                      {label}
                    </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Język</label>
              <div className="flex flex-nowrap gap-2">
                {[
                  { value: "all", label: "Wszystkie", flag: "" },
                  { value: "polski", label: "Polski", flag: "🇵🇱" },
                  { value: "angielski", label: "Angielski", flag: "🇬🇧" }
                ].map(({ value, label, flag }) => (
                    <button
                        key={value}
                        onClick={() => setFilterLanguage(value as any)}
                        className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1
                      ${filterLanguage === value
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                    >
                      {flag && <span>{flag}</span>}
                      {label}
                    </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Tryb</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Wszystkie" },
                  { value: "theory", label: "Teoria" },
                  { value: "practice", label: "Praktyka" },
                  { value: "both", label: "Pełne" }
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setFilterMode(value as any)}
                        className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${filterMode === value
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                    >
                      {label}
                    </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Poziom cenowy</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Wszystkie", icon: "" },
                  { value: 1, label: "Niskie ($)", icon: "" },
                  { value: 2, label: "Średnie ($$)", icon: "" },
                  { value: 3, label: "Wysokie ($$$)", icon: "" }
                ].map(({ value, label, icon }) => (
                    <button
                        key={value}
                        onClick={() => setFilterPrice(value as any)}
                        className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1
                    ${filterPrice === value
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                    >
                      <span>{icon}</span>
                      {label}
                    </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Typ szkolenia</label>
              {filterTraining.length > 0 && (
                <button
                  onClick={() => setFilterTraining([])}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Wyczyść
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                key="all"
                onClick={() => setFilterTraining([])}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${filterTraining.length === 0
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                Wszystkie
              </button>
              {displayedTrainings.map(({ value, label }) => {
                const isSelected = filterTraining.includes(value as TrainingType);
                return (
                  <button
                    key={value}
                    onClick={() => toggleTraining(value)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${isSelected
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {label}
                  </button>
                );
              })}
              {hasMoreTrainings && (
                <button
                  onClick={() => setShowAllTrainings(!showAllTrainings)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  {showAllTrainings ? "Pokaż mniej" : "Pokaż więcej"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}