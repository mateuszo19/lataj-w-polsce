"use client";

import { Location, Training } from "../lib/types";

interface CourseSidePanelProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

const modeLabels = {
  theory: "Teoria",
  practice: "Praktyka",
  both: "Teoria + Praktyka"
};

function groupTrainingsByType(trainings: Training[]) {
  const grouped = new Map<string, Training[]>();

  trainings.forEach(training => {
    if (!grouped.has(training.type)) {
      grouped.set(training.type, []);
    }
    grouped.get(training.type)!.push(training);
  });

  return grouped;
}

function getTrainingTypeInfo(trainings: Training[]) {
  const modes = [...new Set(trainings.map(t => t.mode))];
  const languages = [...new Set(trainings.flatMap(t => t.languages))];
  const prices = trainings.filter(t => t.price !== undefined).map(t => t.price!);

  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

  return {
    modes,
    languages,
    minPrice,
    maxPrice
  };
}

export default function CourseSidePanel({ location, isOpen, onClose }: CourseSidePanelProps) {
  if (!isOpen || !location) {
    return null;
  }

  const groupedTrainings = groupTrainingsByType(location.trainings);

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="border-b border-gray-200 p-6 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h2>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium">
                {location.type === 'aeroklub' ? 'Aeroklub' : location.type.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Zamknij"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Szkolenia</h3>
            <div className="space-y-3">
              {Array.from(groupedTrainings.entries()).map(([type, trainings]) => {
                const info = getTrainingTypeInfo(trainings);

                return (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{type}</h4>
                      {(info.minPrice || info.maxPrice) && (
                        <div className="text-right ml-4">
                          {info.minPrice && info.maxPrice && info.minPrice !== info.maxPrice ? (
                            <span className="text-sm font-medium text-gray-700">
                              {info.minPrice.toLocaleString()} - {info.maxPrice.toLocaleString()} PLN
                            </span>
                          ) : info.minPrice ? (
                            <span className="text-sm font-medium text-gray-700">
                              {info.minPrice.toLocaleString()} PLN
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-500 text-xs w-16 shrink-0">Tryb:</span>
                        <span className="text-gray-700">
                          {info.modes.map(mode => modeLabels[mode as keyof typeof modeLabels]).join(" + ")}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="text-gray-500 text-xs w-16 shrink-0">Języki:</span>
                        <span className="text-gray-700">
                          {info.languages.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Flota</h3>
            <div className="space-y-2">
              {location.aircraft.map((ac, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{ac.type}</span>
                  <span className="text-sm text-gray-500">×{ac.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Kontakt</h3>
            <div className="space-y-3">
              {location.contact.email && (
                <a href={`mailto:${location.contact.email}`} className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{location.contact.email}</span>
                </a>
              )}
              {location.contact.phone && (
                <a href={`tel:${location.contact.phone}`} className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{location.contact.phone}</span>
                </a>
              )}
              {location.contact.website && (
                <a
                  href={location.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900"
                >
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Otwórz stronę</span>
                </a>
              )}
              {location.contact.address && (
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 leading-relaxed">{location.contact.address}</span>
                </div>
              )}
            </div>
          </div>

          {location.icao && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Kod ICAO</h3>
              <code className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded font-mono">
                {location.icao}
              </code>
            </div>
          )}
        </div>
      </div>

      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
    </>
  );
}