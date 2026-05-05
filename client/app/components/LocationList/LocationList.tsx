"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Location, AircraftCategory, TrainingType, Language, Training } from "@/app/lib/types";
import calculateDistance from "@/util/calculateDistance";
import groupTrainingsByType from "@/util/groupTrainingsByType";
import groupAircraftByCategory from "@/util/groupAircraftByCategory";
import categoryLabels from "@/app/const/categoryLabels";
import modeLabels from "@/app/const/modelLabels";
import Filters, { FilterState } from "../Filters/Filters";

/**
 * Props for the LocationList component
 */
interface LocationListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  userLocation: { lat: number; lng: number } | null;
  maxDistance: number;
}

/**
 * Component displaying a list of locations with search and filters
 */
export default function LocationList({
  locations,
  selectedLocation,
  onLocationSelect,
  userLocation,
  maxDistance
}: LocationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    selectedTrainingTypes: new Set<TrainingType>(),
    minPrice: 0,
    maxPrice: 100000,
    hideWithoutPrice: false,
    selectedAircraftCategories: new Set<AircraftCategory>(),
    selectedLanguages: new Set<Language>()
  });

  const availableTrainingTypes = useMemo(() => {
    const types = new Set<TrainingType>();
    locations.forEach(loc => {
      loc.trainings.forEach(t => types.add(t.type));
    });
    return Array.from(types).sort();
  }, [locations]);

  const availableLanguages = useMemo(() => {
    const langs = new Set<Language>();
    locations.forEach(loc => {
      loc.trainings.forEach(t => {
        t.languages.forEach(l => langs.add(l));
      });
    });
    return Array.from(langs);
  }, [locations]);

  const priceRange = useMemo(() => {
    let min = Infinity;
    let max = 0;
    locations.forEach(loc => {
      loc.trainings.forEach(t => {
        if (t.price) {
          if (t.price < min) min = t.price;
          if (t.price > max) max = t.price;
        }
      });
    });
    return { min: min === Infinity ? 0 : min, max };
  }, [locations]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, minPrice: priceRange.min, maxPrice: priceRange.max }));
  }, [priceRange]);

  const filteredLocations = useMemo(() => {
    return locations
      .map(location => {
        const distance = userLocation
          ? calculateDistance(userLocation.lat, userLocation.lng, location.coordinates[1], location.coordinates[0])
          : null;
        return { location, distance };
      })
      .filter(({ location, distance }) => {
        const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTraining = filters.selectedTrainingTypes.size === 0 ||
          location.trainings.some(t => filters.selectedTrainingTypes.has(t.type));

        const matchesPrice = location.trainings.some(t => {
          if (filters.hideWithoutPrice && !t.price) return false;
          if (!t.price) return true;
          return t.price >= filters.minPrice && t.price <= filters.maxPrice;
        });

        const matchesAircraft = filters.selectedAircraftCategories.size === 0 ||
          location.aircraft.some(ac => filters.selectedAircraftCategories.has(ac.category));

        const matchesLanguage = filters.selectedLanguages.size === 0 ||
          location.trainings.some(t => t.languages.some(l => filters.selectedLanguages.has(l)));

        const matchesDistance = !userLocation || (distance !== null && distance <= maxDistance);

        return matchesSearch && matchesTraining && matchesPrice && matchesAircraft && matchesLanguage && matchesDistance;
      })
      .sort((a, b) => {
        if (userLocation && a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        }
        return 0;
      })
      .map(({ location, distance }) => ({ location, distance }));
  }, [locations, searchQuery, filters, userLocation, maxDistance]);

  const handleClearFilters = () => {
    setFilters({
      selectedTrainingTypes: new Set(),
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      hideWithoutPrice: false,
      selectedAircraftCategories: new Set(),
      selectedLanguages: new Set()
    });
  };

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

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <div className="relative flex-1">
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="relative px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtry
            {(() => {
              const count = filters.selectedTrainingTypes.size +
                filters.selectedAircraftCategories.size +
                filters.selectedLanguages.size +
                (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max ? 1 : 0) +
                (filters.hideWithoutPrice ? 1 : 0);
              return count > 0 ? (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {count}
                </span>
              ) : null;
            })()}
          </button>
        </div>
      </div>

      <Filters
        show={showFilters}
        availableTrainingTypes={availableTrainingTypes}
        availableLanguages={availableLanguages}
        priceRange={priceRange}
        filters={filters}
        onFiltersChange={setFilters}
        onClear={handleClearFilters}
      />

      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-600">
          {filteredLocations.length} {filteredLocations.length === 1 ? 'lokalizacja' : filteredLocations.length < 5 ? 'lokalizacje' : 'lokalizacji'}
          {userLocation && ` w promieniu ${maxDistance} km`}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {filteredLocations.map(({ location, distance }) => {
          const isExpanded = expandedId === location.id;

          return (
            <div
              key={location.id}
              className={`mb-3 rounded-lg border overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? "border-gray-900 shadow-lg"
                  : userLocation && distance !== null && distance <= maxDistance
                    ? "border-green-300 bg-green-50/30"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div
                onClick={() => handleLocationClick(location)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                    {location.imageUri ? (
                        <div className="shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden relative bg-gray-100">
                            <Image
                                src={location.imageUri}
                                alt={location.name}
                                fill
                                sizes="64px"
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        ) : (
                        <div
                            className={`shrink-0 w-16 h-16 border-2 rounded-md flex items-center justify-center text-sm ${
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
                    )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{location.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide ${getTypeBadgeColor(location.type)}`}
                      >
                        {getTypeLabel(location.type)}
                      </span>
                    </div>
                    {distance !== null && (
                      <span className="text-[10px] text-gray-500">
                        {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}
                      </span>
                    )}
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
                      {Array.from(groupTrainingsByType(location.trainings)).map(([type, trainings]) => (
                        <div key={type} className="bg-white rounded border border-gray-200 overflow-hidden">
                          <div className="bg-gray-100 px-2 py-1 border-b border-gray-200">
                            <span className="text-[10px] font-semibold text-gray-900">{type}</span>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {trainings.map((training, index) => (
                              <div key={`${type}-${training.mode}-${index}`} className="px-2 py-1.5 flex items-center justify-between gap-2">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-gray-900">
                                      {modeLabels[training.mode]}
                                    </span>
                                    <span className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px]">
                                      {training.languages.join(", ")}
                                    </span>
                                  </div>
                                  {training.notice && (
                                    <span className="text-[9px] text-gray-500 italic">{training.notice}</span>
                                  )}
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
                    <div className="space-y-3">
                      {Array.from(groupAircraftByCategory(location.aircraft)).map(([category, typesMap]) => (
                        <div key={category}>
                          <div className="mb-2">
                            <span className="text-[10px] font-medium text-gray-600 uppercase">{categoryLabels[category]}</span>
                          </div>
                          <div className="space-y-1 pl-4">
                            {Array.from(typesMap.entries()).map(([type, aircrafts]) => (
                              <div key={type} className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded border border-gray-100">
                                <span className="text-[10px] text-gray-700">{type}</span>
                                <div className="flex items-center gap-2">
                                  {aircrafts.length > 1 && (
                                    <span className="text-[9px] text-gray-500">
                                      {aircrafts.map(a => a.registration).filter(Boolean).join(", ") || `${aircrafts.length} szt.`}
                                    </span>
                                  )}
                                  <span className="text-[10px] font-medium text-gray-900">×{aircrafts.length}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="py-3">
                    <h4 className="text-xs font-semibold text-gray-900 mb-2">Kontakt</h4>
                    <div className="space-y-2">
                      {location.contact.cell.map((cell, cellIndex) => (
                        <div key={cellIndex} className="space-y-1">
                          <div className="text-[9px] font-medium text-gray-500 uppercase">{cell.name}</div>
                          {cell.email && (
                            <a href={`mailto:${cell.email}`} className="flex items-center gap-2 text-[10px] text-gray-700 hover:text-gray-900">
                              <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="truncate">{cell.email}</span>
                            </a>
                          )}
                          {cell.phone && (
                            <a href={`tel:${cell.phone}`} className="flex items-center gap-2 text-[10px] text-gray-700 hover:text-gray-900">
                              <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>{cell.phone}</span>
                            </a>
                          )}
                        </div>
                      ))}
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
                      {location.contact.address && (
                        <div className="flex items-start gap-2 text-[10px] text-gray-700">
                          <svg className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600 leading-relaxed">{location.contact.address}</span>
                        </div>
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