"use client";

import {useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap, Circle} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import {Location} from "@/app/lib/types";
import {typeColors} from "@/app/lib/utils";
import {X} from "lucide-react";

/**
 * User location coordinates
 */
interface UserLocation {
    lat: number;
    lng: number;
}

/**
 * Create cluster icon with count
 */
function createClusterIcon(cluster: any): L.DivIcon {
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
        justify-content: center;
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
 * User location marker icon
 */
function createUserLocationIcon(): L.DivIcon {
    return L.divIcon({
        className: "user-location-marker",
        html: `
      <div style="
        position: relative;
        width: 20px;
        height: 20px;
        background: #3B82F6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
        iconSize: L.point(20, 20),
        iconAnchor: L.point(10, 10),
    });
}

/**
 * Props for map controller component
 */
interface MapControllerProps {
    selectedLocation: Location | null;
    userLocation: UserLocation | null;
}

/**
 * Component to update map view when location changes
 */
function MapController({selectedLocation, userLocation}: MapControllerProps) {
    const map = useMap();

    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(
                [selectedLocation.coordinates[1], selectedLocation.coordinates[0]],
                10,
                {duration: 1}
            );
        }
    }, [selectedLocation, map]);

    useEffect(() => {
        if (userLocation && !selectedLocation) {
            map.flyTo([userLocation.lat, userLocation.lng], 8, {duration: 1});
        }
    }, [userLocation, map, selectedLocation]);

    return null;
}

/**
 * Props for map click handler component
 */
interface MapClickHandlerProps {
    onSetUserLocation: (location: { lat: number; lng: number }) => void;
}

/**
 * Map click handler component
 */
function MapClickHandler({onSetUserLocation}: MapClickHandlerProps) {
    const map = useMap();

    useEffect(() => {
        const handleClick = (e: L.LeafletMouseEvent) => {
            const originalEvent = e.originalEvent as MouseEvent;
            if (originalEvent) {
                const target = originalEvent.target as HTMLElement;
                if (target.closest('[data-no-map-click]')) {
                    return;
                }
            }
            onSetUserLocation({lat: e.latlng.lat, lng: e.latlng.lng});
        };

        map.on("click", handleClick);

        return () => {
            map.off("click", handleClick);
        };
    }, [map, onSetUserLocation]);

    return null;
}

/**
 * Props for distance control component
 */
interface DistanceControlProps {
    maxDistance: number;
    onSetMaxDistance: (distance: number) => void;
    deleteZone: () => void;
}

/**
 * Distance slider control component displayed on map
 */
function DistanceControl({maxDistance, onSetMaxDistance, deleteZone}: DistanceControlProps) {
    return (
        <div
            data-no-map-click="true"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
                position: "absolute",
                top: "80px",
                right: "10px",
                zIndex: 1000,
                background: "white",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                minWidth: "150px"
            }}>
            <label style={{
                display: "block",
                fontSize: "11px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px"
            }}>
                Promień: {maxDistance} km
            </label>
            <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={maxDistance}
                onChange={(e) => onSetMaxDistance(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                style={{width: "100%"}}
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteZone();
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "8px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: "pointer"
                }}
            >
                <X size={14} />
                Usuń
            </button>
        </div>
    );
}

/**
 * Props for the Map component
 */
interface MapProps {
    locations: Location[];
    selectedLocation: Location | null;
    onLocationSelect: (location: Location) => void;
    userLocation: UserLocation | null;
    maxDistance: number;
    onSetUserLocation: (location: { lat: number; lng: number }) => void;
    onSetMaxDistance: (distance: number) => void;
    clearUserLocation: () => void;
}

/**
 * Map component with clustering using react-leaflet
 */
export default function Map({
                                locations,
                                selectedLocation,
                                onLocationSelect,
                                userLocation,
                                maxDistance,
                                onSetUserLocation,
                                onSetMaxDistance,
                                clearUserLocation
                            }: MapProps) {
    return (
        <MapContainer
            center={[51.9194, 19.1451]}
            zoom={6}
            className="w-full h-full"
            zoomControl={true}
            style={{cursor: "crosshair"}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
                subdomains="abcd"
                maxZoom={19}
            />

            <MapController selectedLocation={selectedLocation} userLocation={userLocation}/>
            <MapClickHandler onSetUserLocation={onSetUserLocation}/>
            <DistanceControl
                deleteZone={clearUserLocation}
                maxDistance={maxDistance}
                onSetMaxDistance={onSetMaxDistance}/>

            {userLocation && (
                <>
                    <Circle
                        center={[userLocation.lat, userLocation.lng]}
                        radius={maxDistance * 1000}
                        pathOptions={{
                            color: "#3B82F6",
                            fillColor: "#3B82F6",
                            fillOpacity: 0.1,
                            weight: 2
                        }}
                    />
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={createUserLocationIcon()}
                    >
                        <Popup>
                            <div className="text-center">
                                <div className="font-semibold text-sm">Twoja lokalizacja</div>
                                <div className="text-xs text-gray-500">Promień: {maxDistance} km</div>
                                <div className="text-xs text-gray-400 mt-1">Kliknij na mapie, aby zmienić</div>
                            </div>
                        </Popup>
                    </Marker>
                </>
            )}

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
                        eventHandlers={{
                            click: () => onLocationSelect(location)
                        }}
                    >
                        <Popup>
                            <div className="text-center">
                                <div className="font-semibold text-sm">{location.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {location.type === "aeroklub" ? "Aeroklub" : location.type.toUpperCase()}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
