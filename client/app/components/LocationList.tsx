"use client";

import { useState } from "react";
import { Location } from "../lib/types";

/**
 * Props for the LocationList component
 */
interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

/**
 * Distance filter options
 */
type DistanceFilter = "all" | "10" | "30" | "50" | "100" | "200";

/**
 * Component displaying a list of locations with search and filters
 */
export default function LocationList({ locations, selectedLocation, onLocationSelect }: LocationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLocations = locations.filter(location => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "aeroklub":
        return "bg-blue-100 text-blue-800";
      case "ato":
        return "bg-green-100 text-green-800";
      case "dto":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "aeroklub":
        return "Aeroklub";
      case "ato":
        return "ATO";
      case "dto":
        return "DTO";
      default:
        return type;
    }
  };

  const handleLocationClick = (location: Location) => {
    if (expandedId === location.id) {
      setExpandedId(null);
    } else {
      setExpandedId(location.id);
      onLocationSelect(location);
    }
  };

  const groupTrainingsByType = (trainings: any[]) => {
    const grouped = new Map<string, any[]>();

    trainings.forEach(training => {
      if (!grouped.has(training.type)) {
        grouped.set(training.type, []);
      }
      grouped.get(training.type)!.push(training);
    });

    return grouped;
  };

  const modeLabels = {
    theory: "Teoria",
    practice: "Praktyka",
    both: "Teoria + Praktyka"
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Szukaj lokalizacji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-600 mb-2">ODLEGŁOŚĆ OD CIEBIE</div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "10", "30", "50", "100", "200"] as DistanceFilter[]).map((dist) => (
            <button
              key={dist}
              onClick={() => setDistanceFilter(dist)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                distanceFilter === dist
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {dist === "all" ? "Wszędzie" : `${dist} km`}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-600">{filteredLocations.length} lokalizacji</span>
          <button className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
            Sortuj
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {filteredLocations.map((location) => {
          const isExpanded = expandedId === location.id;
          const groupedTrainings = groupTrainingsByType(location.trainings);

          return (
            <div
              key={location.id}
              className={`mb-3 rounded-lg border overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? "border-gray-900 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div
                onClick={() => handleLocationClick(location)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      location.type === "aeroklub"
                        ? "bg-blue-100"
                        : location.type === "ato"
                        ? "bg-green-100"
                        : location.type === "dto"
                        ? "bg-orange-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {location.type === "aeroklub" ? "✈️" : location.type === "ato" ? "🎓" : location.type === "dto" ? "📋" : "📍"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${getTypeBadgeColor(location.type)}`}
                      >
                        {getTypeLabel(location.type)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{location.name}</h3>
                  </div>

                  <div className="shrink-0">
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                  {location.offer && (
                    <div className="py-3 border-b border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2">Oferta</h4>
                      <ul className="space-y-1">
                        {location.offer.map((offer) => (
                          <li key={offer} className="flex items-start gap-2 text-[10px] text-gray-700">
                            <svg className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{offer}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {location.icao && (
                    <div className="py-2 border-b border-gray-200">
                      <span className="text-xs text-gray-500">ICAO:</span>
                      <span className="ml-2 text-xs font-mono text-gray-900">{location.icao}</span>
                    </div>
                  )}

                  <div className="py-3 border-b border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Cennik szkoleń</h4>
                    <div className="space-y-2">
                      {Array.from(groupedTrainings.entries()).map(([type, trainings]) => (
                        <div key={type} className="bg-white rounded border border-gray-200 overflow-hidden">
                          <div className="bg-gray-100 px-2 py-1 border-b border-gray-200">
                            <span className="text-[10px] font-semibold text-gray-900">{type}</span>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {trainings.map((training, index) => (
                              <div key={`${type}-${training.mode}-${index}`} className="px-2 py-1.5 flex items-center justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] font-medium text-gray-900">
                                    {modeLabels[training.mode as keyof typeof modeLabels]}
                                  </span>
                                  <span className="ml-1 px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">
                                    {training.languages.join(", ")}
                                  </span>
                                </div>
                                {training.price !== undefined && (
                                  <span className="text-[10px] font-semibold text-gray-900 shrink-0">
                                    {training.price.toLocaleString()} PLN
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="py-3 border-b border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Flota</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.aircraft.map((ac, index) => (
                        <div key={index} className="flex items-center justify-between py-1 px-2 bg-white rounded border border-gray-200">
                          <span className="text-[10px] text-gray-700">{ac.type}</span>
                          <span className="text-[10px] text-gray-500">×{ac.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="py-3">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Kontakt</h4>
                    <div className="space-y-1">
                      {location.contact.website && (
                        <a
                          href={location.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[10px] text-gray-700 hover:text-gray-900"
                        >
                          <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Otwórz stronę</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">Brak wyników wyszukiwania</p>
          </div>
        )}
      </div>
    </div>
  );
}