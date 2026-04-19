"use client";

import Map from "@/app/components/Map/Map";
import airports from "@/app/const/airports";
import {useState} from "react";
import Filter from "@/app/components/Filter/Filter";
import {Filters} from "@/app/interface/filter.interface";

export default function Home() {
    const [ showFilter, setShowFilter ] = useState(false);
    const [ filters, setFilters ] = useState<Filters>({
        airports: {
            showControlled: true,
            showUncontrolled: true,
            showHelipad: true,
            showHospital: false
        }
    });

    const filteredAirports = airports.filter(airport =>
        (airport.type === "controlled" && filters.airports.showControlled) ||
        (airport.type === "uncontrolled" && filters.airports.showUncontrolled) ||
        (airport.type === "hospital" && filters.airports.showHospital) ||
        (airport.type === "helipad" && filters.airports.showHelipad)
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950">
        <Map
            size={{
                width: '100vw',
                height: '100vh',
            }}
            markers={{
                airports: filteredAirports,
            }}
            position={[51.9194, 19.1451]} zoom={6} />
        <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
                right: showFilter ? "384px" : "0px",
                transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="fixed flex cursor-pointer items-center justify-center rounded-l-2xl top-56 w-10 h-10 bg-[#37353E] z-[99999]">
            <div className="relative w-5 h-5 overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{
                        transform: showFilter ? "rotate(90deg) translateX(-20px)" : "rotate(0deg) translateX(0)",
                        opacity: showFilter ? 0 : 1,
                    }}
                >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{
                        transform: showFilter ? "rotate(0deg) translateX(0)" : "rotate(-90deg) translateX(20px)",
                        opacity: showFilter ? 1 : 0,
                    }}
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
            <Filter
                filters={filters}
                setFilters={setFilters}
                showFilter={showFilter} />
        </button>
    </main>
  );
}
