"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Location,
  LocationType,
  TrainingType,
  Language,
  TrainingMode,
  PriceLevel
} from "./lib/types";
import { typeColors, getTrainingTypesSummary, getLanguagesSummary, createCustomMarker, createPriceBadge } from "./lib/utils";
import FilterPanel from "./components/FilterPanel";
import CourseSidePanel from "./components/CourseSidePanel";
import {locations} from "@/app/const/locations";

/**
 * Main home page component with map, filters, and location details
 */
export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterType, setFilterType] = useState<LocationType | "all">("all");
  const [filterTraining, setFilterTraining] = useState<TrainingType[]>([]);
  const [filterLanguage, setFilterLanguage] = useState<Language | "all">("all");
  const [filterMode, setFilterMode] = useState<TrainingMode | "all">("all");
  const [filterPrice, setFilterPrice] = useState<PriceLevel | "all">("all");

  const getFilteredLocations = (): Location[] => {
    return locations.filter(location => {
      if (filterType !== "all" && location.type !== filterType) return false;

      if (filterTraining.length > 0) {
        const hasTraining = location.trainings.some(t => filterTraining.includes(t.type));
        if (!hasTraining) return false;
      }

      if (filterLanguage !== "all") {
        const hasLanguage = location.trainings.some(t => t.languages.includes(filterLanguage));
        if (!hasLanguage) return false;
      }

      if (filterMode !== "all") {
        const hasMode = location.trainings.some(t => t.mode === filterMode || t.mode === "both");
        if (!hasMode) return false;
      }

      if (filterPrice !== "all" && location.priceLevel !== filterPrice) return false;

      return true;
    });
  };

  const filteredLocations = getFilteredLocations();
  const activeFiltersCount = [
    filterType !== "all",
    filterTraining.length > 0,
    filterLanguage !== "all",
    filterMode !== "all",
    filterPrice !== "all"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilterType("all");
    setFilterTraining([]);
    setFilterLanguage("all");
    setFilterMode("all");
    setFilterPrice("all");
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "carto-tiles",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      } as any,
      center: [19.1451, 51.9194],
      zoom: 6,
      pitch: 0,
      bearing: 0,
    });

    map.current.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
        showZoom: true,
      }),
      "top-right"
    );

    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse-ring {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    filteredLocations.forEach((location) => {
      const markerElement = createCustomMarker(location);

      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: "custom-popup"
      }).setHTML(`
        <div style="
          padding: 12px;
          min-width: 220px;
          max-width: 280px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          cursor: pointer;
        " class="popup-content" data-location-id="${location.id}">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h3 style="
              margin: 0;
              font-size: 14px;
              font-weight: 600;
              color: #1f2937;
              flex: 1;
            ">${location.name}</h3>
            ${createPriceBadge(location.priceLevel)}
          </div>
          <div style="
            display: inline-block;
            padding: 3px 10px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            background: ${typeColors[location.type].primary};
            color: white;
          ">${location.type === 'aeroklub' ? 'Aeroklub' : location.type.toUpperCase()}</div>
          <p style="
            margin: 0 0 8px 0;
            font-size: 12px;
            color: #6b7280;
            line-height: 1.4;
          ">${location.shortDescription}</p>
          <div style="
            margin-bottom: 8px;
            font-size: 11px;
            color: #374151;
          ">
            <strong>Szkolenia:</strong> ${getTrainingTypesSummary(location)}
          </div>
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: #6b7280;
          ">
            <span>🌍</span>
            <span>${getLanguagesSummary(location)}</span>
          </div>
          <div style="
            font-size: 10px;
            color: #9CA3AF;
            font-style: italic;
            margin-top: 6px;
            text-align: center;
          ">Kliknij po więcej →</div>
        </div>
      `);

      const marker = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom"
      })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);

      markerElement.addEventListener("mouseenter", () => {
        markerElement.classList.add("marker-hover");
        marker.togglePopup();
      });

      markerElement.addEventListener("mouseleave", () => {
        markerElement.classList.remove("marker-hover");
        setTimeout(() => {
          if (!markerElement.classList.contains("marker-hover")) {
            marker.togglePopup();
          }
        }, 100);
      });

      markerElement.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedLocation(location);
        setIsModalOpen(true);
      });

      popup.on('open', () => {
        const popupContent = document.querySelector('.popup-content[data-location-id="' + location.id + '"]');
        if (popupContent) {
          popupContent.addEventListener('click', () => {
            setSelectedLocation(location);
            setIsModalOpen(true);
          });
        }
      });
    });

    const handleOpenModal = (e: any) => {
      const locationId = e.detail;
      const location = locations.find(l => l.id === locationId);
      if (location) {
        setSelectedLocation(location);
        setIsModalOpen(true);
      }
    };

    window.addEventListener('openSchoolModal', handleOpenModal as any);

    return () => {
      window.removeEventListener('openSchoolModal', handleOpenModal as any);
    };
  }, [filteredLocations]);

  return (
    <div className="w-full h-screen relative bg-gray-50">
      <FilterPanel
        filteredCount={filteredLocations.length}
        totalCount={locations.length}
        filterType={filterType}
        filterTraining={filterTraining}
        filterLanguage={filterLanguage}
        filterMode={filterMode}
        filterPrice={filterPrice}
        activeFiltersCount={activeFiltersCount}
        setFilterType={setFilterType}
        setFilterTraining={setFilterTraining}
        setFilterLanguage={setFilterLanguage}
        setFilterMode={setFilterMode}
        setFilterPrice={setFilterPrice}
        onClearFilters={clearFilters}
      />

      <div ref={mapContainer} className="w-full h-full" />

      <CourseSidePanel
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}