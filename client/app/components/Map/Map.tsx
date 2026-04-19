"use client";

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {LatLngExpression} from "leaflet";
import {Airport} from "@/app/interface/airport.interface";
import {AirportType} from "@/app/type/airport.type";

const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);

interface MapProps {
    position: LatLngExpression,
    zoom: number,
    size: {
        height: string;
        width: string;
    },
    markers: {
        airports: Airport[],
    }
}

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const MapEvents = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { useMapEvents } = mod;
    return function MapEvents({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
      const mapEvents = useMapEvents({
        zoomend() {
          onZoomChange(mapEvents.getZoom());
        },
      });
      return null;
    };
  }),
  { ssr: false }
);

const Map = ({position, zoom, size, markers} : MapProps) => {
    const [currentZoom, setCurrentZoom] = useState(zoom);
    const [zoneRadius, setZoneRadius] = useState(4000);

    const handleZoomChange = useCallback((newZoom: number) => {
        setCurrentZoom(newZoom);

        if(newZoom > 12) {
            setZoneRadius(4000)
        }
        if(newZoom <= 12) {
            setZoneRadius(3000)
        }
        console.log('Current zoom:', newZoom);
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            bounceAtZoomLimits={true}
            maxZoom={15}
            scrollWheelZoom={true}
            style={{ height: size.height, width: size.width }}
            className="dark-map"
        >
            <MapEvents onZoomChange={handleZoomChange} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {markers.airports.map(airport => {
                const { latitude, longitude } = airport.position;

                const colorMatch = (type: AirportType): {fill: string, color: string} => {
                    switch (type) {
                        case 'controlled':
                            return ({
                                color: '#60A5FA',
                                fill: '#3B82F6'
                            })
                        case 'uncontrolled':
                            return ({
                                color: '#FFA02E',
                                fill: '#FFEF91'
                            })
                        case "hospital":
                            return ({
                                color: '#468432',
                                fill: '#9AD872'
                            })
                        case "helipad":
                            return ({
                                color: '#14B8A6',
                                fill: '#2DD4BF'
                            })
                        default:
                            return ({
                                color: '#60A5FA',
                                fill: '#3B82F6'
                            })
                    }
                }

                const {color, fill} = colorMatch(airport.type)

                return (
                    <Circle
                        key={`${airport.icao}` + airport.id}
                        center={[latitude, longitude]}
                        radius={zoneRadius}
                        pathOptions={{
                            color: color,
                            fillColor: fill,
                            fillOpacity: 0.3,
                            weight: 2
                        }}
                    >
                            <Popup>
                                <div className="flex flex-col">
                                    <h3 className="text-base">{airport.name} {airport.icao && `(${airport.icao})`}</h3>
                                    <span className="text-sm">{airport.reporter}</span>
                                    <div className="flex gap-2 mt-2">
                                        {airport.supportedVehicles?.map(item => (
                                            <span
                                                key={item}
                                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                    item === 'plane'
                                                        ? 'bg-blue-500/20 text-black'
                                                        : 'bg-teal-500/20 text-black'
                                                }`}
                                            >
                                                {item === 'plane' ? 'Samolot' : 'Śmigłowiec'}
                                            </span>
                                        ))}
                                    </div>
                                    <span>{airport.type}</span>
                                </div>
                            </Popup>
                    </Circle>
                )
            })}

        </MapContainer>
    )
};

export default Map;