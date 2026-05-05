"use client";

import { useState } from "react";
import { Location } from "./lib/types";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import Map from "./components/Map";
import {locations} from "@/app/const/locations";

/**
 * Main home page component with split-screen layout
 */
export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <Header locationCount={locations.length} />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[480px] flex flex-col border-r border-gray-200">
          <LocationList
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        <div className="flex-1 relative">
          <Map
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>
    </div>
  );
}