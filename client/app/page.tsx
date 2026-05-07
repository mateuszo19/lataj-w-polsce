"use client";

import { useState, useCallback } from "react";
import { Location } from "@/app/lib/types";
import Header from "@/app/components/Header/Header";
import LocationList from "@/app/components/LocationList/LocationList";
import dynamic from "next/dynamic";
import { locations } from "@/app/const/locations";

const Map = dynamic(
  () => import("@/app/components/Map/Map").then(mod => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Ładowanie mapy...</div>
      </div>
    )
  }
);

/**
 * User location coordinates
 */
interface UserLocation {
  lat: number;
  lng: number;
}

/**
 * Main home page component with split-screen layout
 */
export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(50);

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleSetUserLocation = useCallback((location: UserLocation) => {
    setUserLocation(location);
  }, []);

  const handleSetMaxDistance = useCallback((distance: number) => {
    setMaxDistance(distance);
  }, []);

  const clearUserLocation = () => {
      setUserLocation(null);
  }

  const handleGetCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <Header
        locationCount={locations.length}
        onGetCurrentLocation={handleGetCurrentLocation}
        userLocation={userLocation}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[480px] flex flex-col border-r border-gray-200">
          <LocationList
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            userLocation={userLocation}
            maxDistance={maxDistance}
          />
        </div>

        <div className="flex-1 relative">
          <Map
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            userLocation={userLocation}
            maxDistance={maxDistance}
            onSetUserLocation={handleSetUserLocation}
            onSetMaxDistance={handleSetMaxDistance}
            clearUserLocation={clearUserLocation}
          />
        </div>
      </div>
    </div>
  );
}