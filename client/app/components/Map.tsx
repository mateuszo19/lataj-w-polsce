"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Location } from "../lib/types";
import { typeColors } from "../lib/utils";

/**
 * Create cluster icon with count
 */
function createClusterIcon(cluster: L.MarkerCluster): L.DivIcon {
  const count = cluster.getChildCount();
  const size = Math.min(40 + count * 2, 70);

  return L.divIcon({
    html: `<div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, #1F2937, #111827);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(31, 41, 55, 0.4), 0 4px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 3px solid white;
      cursor: pointer;
    ">
      <span style="
        font-size: ${Math.min(16 + count * 0.3, 24)}px;
        font-weight: 700;
        color: white;
        font-family: 'Inter', 'Arial', sans-serif;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      ">${count}</span>
    </div>`,
    className: "custom-cluster-icon",
    iconSize: L.point(size, size),
  });
}

/**
 * Custom badge icon for single location
 */
function createLocationBadge(type: string, name: string): L.DivIcon {
  const colors = typeColors[type as keyof typeof typeColors] || typeColors.aeroklub;

  const textWidth = Math.max(100, name.length * 8);

  return L.divIcon({
    className: "custom-location-badge",
    html: `
      <div style="
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 2px solid ${colors.primary};
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        min-width: ${textWidth}px;
      ">
        <span style="
          font-size: 12px;
          font-weight: 600;
          color: #1F2937;
          white-space: nowrap;
        ">${name}</span>
      </div>
    `,
    iconSize: L.point(textWidth + 60, 36),
    iconAnchor: L.point((textWidth + 60) / 2, 18),
    popupAnchor: L.point(0, -18),
  });
}

/**
 * Component to update map view when location changes
 */
interface MapControllerProps {
  selectedLocation: Location | null;
}

function MapController({ selectedLocation }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(
        [selectedLocation.coordinates[1], selectedLocation.coordinates[0]],
        10,
        {
          duration: 1,
        }
      );
    }
  }, [selectedLocation, map]);

  return null;
}

/**
 * Props for the Map component
 */
interface MapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

/**
 * Map component with clustering using react-leaflet
 */
export default function Map({ locations, selectedLocation, onLocationSelect }: MapProps) {
  return (
    <MapContainer
      center={[51.9194, 19.1451]}
      zoom={6}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        subdomains="abcd"
        maxZoom={19}
      />

      <MapController selectedLocation={selectedLocation} />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}
        maxClusterRadius={60}
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
        zoomToBoundsOnClick={true}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates[1], location.coordinates[0]]}
            icon={createLocationBadge(location.type, location.name)}
          >
            <Popup
              closeButton={false}
              className="custom-popup"
              offset={[0, -18]}
            >
              <div
                className="p-3 min-w-[220px] cursor-pointer"
                onClick={() => onLocationSelect(location)}
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="m-0 text-sm font-semibold text-gray-900 flex-1">
                    {location.name}
                  </h3>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-[10px] text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      background: typeColors[location.type as keyof typeof typeColors]?.primary || "#8B5CF6",
                      color: "white",
                    }}
                  >
                    {location.type === "aeroklub" ? "Aeroklub" : location.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}