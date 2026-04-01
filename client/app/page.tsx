"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Types dla lokalizacji
type LocationType = "aeroklub" | "ato" | "dto";
type TrainingType = "PPL(A)" | "PPL(H)" | "CPL(A)" | "ATPL(A)" | "LAPL(A)" | "SPL" | "GLIDER" | "ULM" | "FI(A)" | "CRI";
type Language = "polski" | "angielski" | "niemiecki" | "rosyjski";
type TrainingMode = "theory" | "practice" | "both";
type PriceLevel = 1 | 2 | 3;

interface Training {
  type: TrainingType;
  mode: TrainingMode;
  languages: Language[];
  price?: number;
}

interface Aircraft {
  type: string;
  count: number;
  registration?: string;
}

interface Location {
  id: string;
  name: string;
  type: LocationType;
  coordinates: [number, number];
  description: string;
  shortDescription: string;
  trainings: Training[];
  priceLevel: PriceLevel;
  aircraft: Aircraft[];
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  icao?: string;
}

const locations: Location[] = [
  // Aerokluby - niebieski/fioletowy
  {
    id: "aeroklub-1",
    name: "Aeroklub Warszawski",
    type: "aeroklub",
    coordinates: [20.8863, 52.2594],
    description: "Najstarszy aeroklub w Polsce, założony w 1921. Kompleksowe szkolenia od PPL po ATPL.",
    shortDescription: "Najstarszy aeroklub w Polsce ✓",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 15000 },
      { type: "CPL(A)", mode: "both", languages: ["polski", "angielski"], price: 25000 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 5000 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 10000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 172", count: 4 },
      { type: "Piper PA-28", count: 3 },
      { type: "Zlin 242", count: 2 },
      { type: "SZD-48-2 Jantar", count: 5 }
    ],
    contact: {
      email: "biuro@aeroklub.warszawa.pl",
      phone: "+48 22 123 45 67",
      website: "https://aeroklub.warszawa.pl",
      address: "ul. Księcia Bolesława 1/3, 01-494 Warszawa"
    },
    icao: "EPBC"
  },
  {
    id: "aeroklub-2",
    name: "Aeroklub Krakowski",
    type: "aeroklub",
    coordinates: [19.7848, 50.0775],
    description: "Prestiżowy aeroklub z tradycjami. Szkolenia PPL(A), CPL(A) z angielskim teoretycznym.",
    shortDescription: "Tradycje i nowoczesność ✓",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 14000 },
      { type: "CPL(A)", mode: "both", languages: ["angielski"], price: 28000 },
      { type: "FI(A)", mode: "both", languages: ["polski", "angielski"], price: 8000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 150", count: 3 },
      { type: "Cessna 172", count: 2 },
      { type: "Diamond DA20", count: 1 }
    ],
    contact: {
      email: "info@aeroklub.krakow.pl",
      phone: "+48 12 234 56 78",
      website: "https://aeroklub.krakow.pl",
      address: "ul. Marii Skłodowskiej-Curie 8, 30-059 Kraków"
    },
    icao: "EPKR"
  },
  {
    id: "aeroklub-3",
    name: "Aeroklub Poznański",
    type: "aeroklub",
    coordinates: [16.8261, 52.4210],
    description: "Dynamicznie rozwijający się aeroklub. PPL(A) w konkurencyjnych cenach.",
    shortDescription: "Szkolenia w dobrych cenach",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 12000 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 9000 },
      { type: "GLIDER", mode: "practice", languages: ["polski"], price: 4000 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "Robin DR400", count: 2 },
      { type: "Zlin 142", count: 2 },
      { type: "SZD-51-1 Junior", count: 4 }
    ],
    contact: {
      email: "kontakt@aeroklub.poznan.pl",
      phone: "+48 61 876 54 32",
      website: "https://aeroklub.poznan.pl",
      address: "ul. Lotnisko 15, 60-401 Poznań"
    },
    icao: "EPBA"
  },
  {
    id: "aeroklub-4",
    name: "Aeroklub Wrocławski",
    type: "aeroklub",
    coordinates: [17.0230, 51.1027],
    description: "Profesjonalne szkolenia lotnicze na Dolnym Śląsku. Kursy teoretyczne w języku angielskim.",
    shortDescription: " Profesjonalizm i doświadczenie",
    trainings: [
      { type: "PPL(A)", mode: "theory", languages: ["angielski"], price: 3000 },
      { type: "PPL(A)", mode: "practice", languages: ["polski", "angielski"], price: 13000 },
      { type: "ATPL(A)", mode: "theory", languages: ["angielski"], price: 5000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 172", count: 3 },
      { type: "Tecnam P2002", count: 1 }
    ],
    contact: {
      email: "biuro@aeroklub.wroclaw.pl",
      phone: "+48 71 345 67 89",
      website: "https://aeroklub.wroclaw.pl",
      address: "ul. Portowa 6, 54-031 Wrocław"
    },
    icao: "EPWR"
  },
  {
    id: "aeroklub-5",
    name: "Aeroklub Gdański",
    type: "aeroklub",
    coordinates: [18.4662, 54.3776],
    description: "Szkolenia lotnicze nad morzem. PPL(A) i szkolenia szybowcowe.",
    shortDescription: "Lataj nad Bałtykiem!",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 13500 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 4500 },
      { type: "ULM", mode: "both", languages: ["polski"], price: 8000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 152", count: 3 },
      { type: "Piper PA-38", count: 2 }
    ],
    contact: {
      email: "info@aeroklub.gdansk.pl",
      phone: "+48 58 456 78 90",
      website: "https://aeroklub.gdansk.pl",
      address: "ul. Szybowcowa 2, 80-298 Gdańsk"
    },
    icao: "EPGD"
  },
  {
    id: "aeroklub-6",
    name: "Aeroklub Katowicki",
    type: "aeroklub",
    coordinates: [19.0837, 50.2548],
    description: "Szkolenia PPL(A) i CPL(A) na lotnisku Muchowiec. Doświadczona kadra instruktorska.",
    shortDescription: "Śląskie centrum lotnicze",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 14500 },
      { type: "CPL(A)", mode: "practice", languages: ["polski"], price: 22000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Zlin 142", count: 3 },
      { type: "Cessna 172", count: 1 }
    ],
    contact: {
      email: "kontakt@aeroklub.katowice.pl",
      phone: "+48 32 256 78 90",
      website: "https://aeroklub.katowice.pl",
      address: "ul. Lotnicza 2, 40-458 Katowice"
    },
    icao: "EPKM"
  },
  {
    id: "aeroklub-7",
    name: "Aeroklub Lubelski",
    type: "aeroklub",
    coordinates: [22.4627, 51.2552],
    description: "Aeroklub wschodniej Polski. Szkolenia szybowcowe i samolotowe w przystępnych cenach.",
    shortDescription: "Wschodnie skrzydła polskiego lotnictwa",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 11000 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 3500 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "PZL-104 Wilga", count: 1 },
      { type: "SZD-30 Puchatek", count: 3 }
    ],
    contact: {
      email: "aeroklublubelski@wp.pl",
      phone: "+48 81 567 89 01",
      website: "https://aeroklub.lublin.pl",
      address: "ul. Biala-Podlaska 1, 21-001 Świdnik"
    },
    icao: "EPLS"
  },
  {
    id: "aeroklub-8",
    name: "Aeroklub Łódzki",
    type: "aeroklub",
    coordinates: [19.3967, 51.7341],
    description: "Szkolenia PPL(A) i szybownictwo w centrum Polski. Nowoczesna flota samolotowa.",
    shortDescription: "Lotnicze serce Polski",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 13000 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 4000 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "Diamond DA40", count: 2 },
      { type: "Cessna 150", count: 2 }
    ],
    contact: {
      email: "info@aeroklub.lodz.pl",
      phone: "+48 42 234 56 78",
      website: "https://aeroklub.lodz.pl",
      address: "ul. Lubelska 5, 94-054 Łódź"
    },
    icao: "EPLL"
  },
  {
    id: "aeroklub-13",
    name: "Aeroklub Bielsko-Bialski",
    type: "aeroklub",
    coordinates: [19.0450, 49.8224],
    description: "Aeroklub w górach. Unikalne warunki do szkolenia w terenie górskim. PPL(A) i GLIDER.",
    shortDescription: "Lataj w górach!",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 12500 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 3800 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "PZL-104 Wilga", count: 2 },
      { type: "SZD-9 Bocian", count: 2 }
    ],
    contact: {
      email: "biuro@aeroklub.bielsko.pl",
      phone: "+48 33 456 78 90",
      website: "https://aeroklub.bielsko.pl",
      address: "ul. Startowa 12, 43-300 Bielsko-Biała"
    }
  },

  // ATO (Approved Training Organization) - zielony
  {
    id: "ato-1",
    name: "Eagle Flight Academy",
    type: "ato",
    coordinates: [16.8261, 52.4210],
    description: "Profesjonalna szkoła pilotów - ATO.PL-135. Kompletne szkolenia od PPL do ATPL. Teoria w języku angielskim.",
    shortDescription: "Profesjonalne szkolenia ATO",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 18000 },
      { type: "CPL(A)", mode: "both", languages: ["angielski"], price: 30000 },
      { type: "ATPL(A)", mode: "both", languages: ["angielski"], price: 65000 },
      { type: "FI(A)", mode: "both", languages: ["angielski"], price: 12000 }
    ],
    priceLevel: 3,
    aircraft: [
      { type: "Cessna 172", count: 4 },
      { type: "Diamond DA40", count: 2 },
      { type: "Diamond DA42", count: 1 },
      { type: "ALSIM ALX", count: 1 }
    ],
    contact: {
      email: "info@eagleflight.pl",
      phone: "+48 600 100 200",
      website: "https://eagleflight.pl",
      address: "Lotnisko Poznań-Kępa, 60-401 Poznań"
    },
    icao: "EPBA"
  },
  {
    id: "ato-2",
    name: "Baltic Flight Training",
    type: "ato",
    coordinates: [18.4662, 54.3776],
    description: "Szkolenie lotnicze nad Bałtykiem. ATO z pełnym spektrum szkoleń EASA. Symulator FNPT II.",
    shortDescription: "ATO nad morzem",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 17000 },
      { type: "ATPL(A)", mode: "theory", languages: ["angielski"], price: 7000 },
      { type: "CRI", mode: "both", languages: ["angielski"], price: 10000 }
    ],
    priceLevel: 3,
    aircraft: [
      { type: "Cessna 172", count: 3 },
      { type: "Piper PA-28", count: 2 },
      { type: "FNPT II Simulator", count: 1 }
    ],
    contact: {
      email: "baltic@flighttraining.pl",
      phone: "+48 58 345 67 89",
      website: "https://balticflight.pl",
      address: "Gdańsk-Rębiechowo, 80-298 Gdańsk"
    },
    icao: "EPGD"
  },
  {
    id: "ato-3",
    name: "LOT Flight Academy",
    type: "ato",
    coordinates: [20.9671, 52.1657],
    description: "Szkoła lotnicza PLL LOT - ATO. Najwyższy standard szkolenia w Polsce. Type Rating B737/A320.",
    shortDescription: "Akademia narodowego przewoźnika",
    trainings: [
      { type: "ATPL(A)", mode: "both", languages: ["angielski"], price: 70000 },
      { type: "CPL(A)", mode: "practice", languages: ["angielski"], price: 35000 },
      { type: "FI(A)", mode: "both", languages: ["angielski"], price: 15000 }
    ],
    priceLevel: 3,
    aircraft: [
      { type: "Cessna 172", count: 6 },
      { type: "Diamond DA40", count: 4 },
      { type: "Diamond DA42", count: 2 },
      { type: "Boeing 737 SIM", count: 2 }
    ],
    contact: {
      email: "academy@lot.com",
      phone: "+48 22 111 22 33",
      website: "https://lotflightacademy.com",
      address: "ul. 17 Stycznia 43, 00-739 Warszawa"
    },
    icao: "EPWA"
  },
  {
    id: "ato-4",
    name: "SkySchool Poland",
    type: "ato",
    coordinates: [19.7848, 50.0775],
    description: "Szkoła pilotów w Małopolsce - ATO. Szkolenia PPL i CPL w systemie modularnym.",
    shortDescription: "Modularne szkolenia w Krakowie",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 16000 },
      { type: "CPL(A)", mode: "both", languages: ["angielski"], price: 28000 },
      { type: "ATPL(A)", mode: "theory", languages: ["angielski"], price: 6500 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 172", count: 3 },
      { type: "Tecnam P2006T", count: 1 }
    ],
    contact: {
      email: "info@skyschool.pl",
      phone: "+48 12 345 67 89",
      website: "https://skyschool.pl",
      address: "Kraków-Balice, 32-083 Balice"
    },
    icao: "EPKK"
  },
  {
    id: "ato-5",
    name: "Central Flight Academy",
    type: "ato",
    coordinates: [19.0837, 50.2548],
    description: "Centrum szkolenia lotniczego - ATO. Specjalizacja: szkolenia instruktorskie i typu.",
    shortDescription: "ATO na Śląsku",
    trainings: [
      { type: "FI(A)", mode: "both", languages: ["polski", "angielski"], price: 11000 },
      { type: "CRI", mode: "both", languages: ["angielski"], price: 9000 },
      { type: "PPL(A)", mode: "practice", languages: ["polski"], price: 14000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 172", count: 2 },
      { type: "Zlin 242", count: 1 }
    ],
    contact: {
      email: "cfa@katowice.pl",
      phone: "+48 32 234 56 78",
      website: "https://cfa-katowice.pl",
      address: "Katowice-Muchowiec, 40-458 Katowice"
    },
    icao: "EPKM"
  },

  // DTO (Declared Training Organization) - pomarańczowy/różowy
  {
    id: "dto-1",
    name: "Aero Club DTO Warszawa",
    type: "dto",
    coordinates: [20.8863, 52.2594],
    description: "Szkolenie PPL(A) i LAPL(A) - DTO. Indywidualne podejście do kursanta. Kurs teoretyczny po polsku.",
    shortDescription: "Kursy PPL w Warszawie",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 13000 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 10000 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 150", count: 2 },
      { type: "Piper PA-38", count: 1 }
    ],
    contact: {
      email: "dto@aeroklub.warszawa.pl",
      phone: "+48 22 987 65 43",
      website: "https://dto.aeroklub.warszawa.pl",
      address: "ul. Księcia Bolesława 1/3, Warszawa"
    },
    icao: "EPBC"
  },
  {
    id: "dto-2",
    name: "FlyTech DTO Poznań",
    type: "dto",
    coordinates: [16.8261, 52.4210],
    description: "Kursy teoretyczne i praktyczne - DTO. Nowoczesne podejście do szkolenia. Teoria w języku angielskim.",
    shortDescription: "Nowoczesne szkolenia w Poznaniu",
    trainings: [
      { type: "PPL(A)", mode: "theory", languages: ["angielski"], price: 2500 },
      { type: "PPL(A)", mode: "practice", languages: ["polski"], price: 12000 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 9500 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "Tecnam P2002", count: 2 },
      { type: "Cessna 172", count: 1 }
    ],
    contact: {
      email: "kontakt@flytech.pl",
      phone: "+48 61 123 45 67",
      website: "https://flytech.pl",
      address: "Lotnisko Kępa, Poznań"
    },
    icao: "EPBA"
  },
  {
    id: "dto-3",
    name: "WindRider DTO Wrocław",
    type: "dto",
    coordinates: [17.0230, 51.1027],
    description: "Szkolenie na szybowce i samoloty - DTO. Specjalizacja: szkolenia szybowcowe.",
    shortDescription: "Szybowce i samoloty",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 12500 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 4200 },
      { type: "SPL", mode: "both", languages: ["polski"], price: 3500 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "SZD-51 Junior", count: 4 },
      { type: "Piper PA-28", count: 1 }
    ],
    contact: {
      email: "windrider@wroclaw.pl",
      phone: "+48 71 987 65 43",
      website: "https://windrider.pl",
      address: "Wrocław-Strachowice"
    },
    icao: "EPWR"
  },
  {
    id: "dto-4",
    name: "Pomerania Aviation DTO",
    type: "dto",
    coordinates: [18.4662, 54.3776],
    description: "Szkolenia lotnicze na Pomorzu - DTO. PPL(A) w przystępnych cenach.",
    shortDescription: "Szkolenia na Pomorzu",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 12000 },
      { type: "ULM", mode: "both", languages: ["polski"], price: 7500 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "Cessna 150", count: 2 },
      { type: "ICON A5", count: 1 }
    ],
    contact: {
      email: "pomorania@aviation.pl",
      phone: "+48 58 876 54 32",
      website: "https://pomorania-aviation.pl",
      address: "Gdańsk-Rębiechowo"
    },
    icao: "EPGD"
  },
  {
    id: "dto-5",
    name: "Mountain Flight DTO Bielsko",
    type: "dto",
    coordinates: [19.0450, 49.8224],
    description: "Lotnicze szkolenia w górach - DTO. Szkolenia z elementami lotów górskich.",
    shortDescription: "Loty górskie i PPL",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 13500 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 10500 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "PZL-104 Wilga", count: 2 },
      { type: "Cessna 172", count: 1 }
    ],
    contact: {
      email: "mountain@flight.pl",
      phone: "+48 33 765 43 21",
      website: "https://mountain-flight.pl",
      address: "Bielsko-Biała Aleksandrowice"
    }
  },
  {
    id: "dto-6",
    name: "Mazovia DTO Modlin",
    type: "dto",
    coordinates: [20.6525, 52.4493],
    description: "Centrum szkolenia na Mazowszu - DTO. Kursy teoretyczne w języku angielskim i polskim.",
    shortDescription: "DTO pod Warszawą",
    trainings: [
      { type: "PPL(A)", mode: "theory", languages: ["polski", "angielski"], price: 3000 },
      { type: "PPL(A)", mode: "practice", languages: ["polski"], price: 12500 },
      { type: "ATPL(A)", mode: "theory", languages: ["angielski"], price: 5500 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Cessna 172", count: 2 },
      { type: "Diamond DA20", count: 1 }
    ],
    contact: {
      email: "mazovia@dto.pl",
      phone: "+48 23 456 78 90",
      website: "https://mazovia-dto.pl",
      address: "Modlin, 05-101 Nowy Dwór Mazowiecki"
    },
    icao: "EPMO"
  },
  {
    id: "dto-7",
    name: "Vistula DTO Łódź",
    type: "dto",
    coordinates: [19.3967, 51.7341],
    description: "Szkolenia lotnicze w Łodzi - DTO. PPL(A) w przystępnych cenach z elastycznym grafikiem.",
    shortDescription: "Elastyczne szkolenia w Łodzi",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski"], price: 11500 },
      { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 9000 }
    ],
    priceLevel: 1,
    aircraft: [
      { type: "Robin DR400", count: 2 },
      { type: "Cessna 150", count: 1 }
    ],
    contact: {
      email: "vistula@dto.lodz.pl",
      phone: "+48 42 345 67 89",
      website: "https://vistula-dto.pl",
      address: "Łódź-Lublinek"
    },
    icao: "EPLL"
  },
  {
    id: "dto-8",
    name: "Carpathian DTO Rzeszów",
    type: "dto",
    coordinates: [22.0456, 50.1105],
    description: "Szkolenia na Podkarpaciu - DTO. PPL(A) i szybownictwo. Kursy w języku angielskim.",
    shortDescription: "Szkolenia na Podkarpaciu",
    trainings: [
      { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 13000 },
      { type: "GLIDER", mode: "both", languages: ["polski"], price: 4000 },
      { type: "PPL(H)", mode: "theory", languages: ["angielski"], price: 3500 }
    ],
    priceLevel: 2,
    aircraft: [
      { type: "Robinson R44", count: 1 },
      { type: "Cessna 172", count: 1 }
    ],
    contact: {
      email: "carpathian@dto.pl",
      phone: "+48 17 234 56 78",
      website: "https://carpathian-dto.pl",
      address: "Rzeszów-Jasionka"
    },
    icao: "EPRZ"
  },
];

// Kolory dla typów lokalizacji (Just Join IT style)
const typeColors = {
  aeroklub: {
    primary: "#8B5CF6", // violet-500
    secondary: "#A78BFA", // violet-400
    icon: "✈"
  },
  ato: {
    primary: "#10B981", // emerald-500
    secondary: "#34D399", // emerald-400
    icon: "🎓"
  },
  dto: {
    primary: "#F59E0B", // amber-500
    secondary: "#FBBF24", // amber-400
    icon: "📋"
  },
};

// Helper function: Generate dollar icons for price level
function getPriceIcons(priceLevel: PriceLevel): string {
  return "$".repeat(priceLevel);
}

// Helper function: Get training types summary
function getTrainingTypesSummary(location: Location): string {
  const types = location.trainings.map(t => t.type);
  const uniqueTypes = [...new Set(types)];
  return uniqueTypes.slice(0, 3).join(", ") + (uniqueTypes.length > 3 ? "..." : "");
}

// Helper function: Get languages summary
function getLanguagesSummary(location: Location): string {
  const allLanguages = location.trainings.flatMap(t => t.languages);
  const uniqueLanguages = [...new Set(allLanguages)];
  const flags: Record<Language, string> = {
    polski: "🇵🇱",
    angielski: "🇬🇧",
    niemiecki: "🇩🇪",
    rosyjski: "🇷🇺"
  };
  return uniqueLanguages.map(lang => flags[lang]).join(" ");
}

// Helper function: Create price badge HTML
function createPriceBadge(priceLevel: PriceLevel): string {
  const colors = {
    1: "#10B981", // green
    2: "#F59E0B", // amber
    3: "#EF4444"  // red
  };
  return `
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      background: ${colors[priceLevel]}15;
      color: ${colors[priceLevel]};
    ">
      <span style="font-size: 16px;">${getPriceIcons(priceLevel)}</span>
      <span>${priceLevel === 1 ? 'Niskie' : priceLevel === 2 ? 'Średnie' : 'Wysokie'}</span>
    </div>
  `;
}

// Helper function: Create training tag HTML
function createTrainingTag(training: Training): string {
  const modeColors = {
    theory: "#3B82F6", // blue
    practice: "#8B5CF6", // violet
    both: "#10B981" // green
  };
  const modeLabels = {
    theory: "Teoria",
    practice: "Praktyka",
    both: "Teoria+Praktyka"
  };

  return `
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      background: #F3F4F6;
      margin: 4px;
      border: 1px solid #E5E7EB;
    ">
      <span style="
        font-weight: 600;
        color: #1F2937;
      ">${training.type}</span>
      <span style="
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 500;
        background: ${modeColors[training.mode]}20;
        color: ${modeColors[training.mode]};
      ">${modeLabels[training.mode]}</span>
      <span style="font-size: 11px; color: #6B7280;">${training.languages.map(l => l === 'angielski' ? 'EN' : 'PL').join('/')}</span>
    </div>
  `;
}

// Funkcja tworząca custom marker w stylu Just Join IT
function createCustomMarker(location: Location): HTMLElement {
  const colors = typeColors[location.type];

  // Główny kontener markera - bez position: relative dla MapLibre GL
  const marker = document.createElement("div");
  marker.className = "custom-marker";
  marker.style.cssText = `
    cursor: pointer;
    transition: transform 0.2s ease;
  `;

  // Zewnętrzny pierścień z animacją pulsowania
  const pulseRing = document.createElement("div");
  pulseRing.style.cssText = `
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${colors.primary}20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    pointer-events: none;
  `;

  // Marker w kształcie łezki z gradientem
  const markerBody = document.createElement("div");
  markerBody.style.cssText = `
    position: relative;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, ${colors.secondary}, ${colors.primary});
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px ${colors.primary}40, 0 4px 8px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid white;
  `;

  // Ikona wewnątrz markera
  const icon = document.createElement("div");
  icon.textContent = colors.icon;
  icon.style.cssText = `
    font-size: 18px;
    transform: rotate(45deg);
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  `;

  markerBody.appendChild(icon);
  marker.appendChild(pulseRing);
  marker.appendChild(markerBody);

  // Hover effect
  marker.addEventListener("mouseenter", () => {
    markerBody.style.transform = "rotate(-45deg) scale(1.15)";
    markerBody.style.boxShadow = `0 12px 28px ${colors.primary}60, 0 6px 12px rgba(0,0,0,0.15)`;
  });

  marker.addEventListener("mouseleave", () => {
    markerBody.style.transform = "rotate(-45deg) scale(1)";
    markerBody.style.boxShadow = `0 8px 20px ${colors.primary}40, 0 4px 8px rgba(0,0,0,0.1)`;
  });

  return marker;
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [filterType, setFilterType] = useState<LocationType | "all">("all");
  const [filterTraining, setFilterTraining] = useState<TrainingType | "all">("all");
  const [filterLanguage, setFilterLanguage] = useState<Language | "all">("all");
  const [filterMode, setFilterMode] = useState<TrainingMode | "all">("all");
  const [filterPrice, setFilterPrice] = useState<PriceLevel | "all">("all");

  // Filter function
  const getFilteredLocations = (): Location[] => {
    return locations.filter(location => {
      // Type filter
      if (filterType !== "all" && location.type !== filterType) return false;

      // Training type filter
      if (filterTraining !== "all") {
        const hasTraining = location.trainings.some(t => t.type === filterTraining);
        if (!hasTraining) return false;
      }

      // Language filter
      if (filterLanguage !== "all") {
        const hasLanguage = location.trainings.some(t => t.languages.includes(filterLanguage));
        if (!hasLanguage) return false;
      }

      // Mode filter
      if (filterMode !== "all") {
        const hasMode = location.trainings.some(t => t.mode === filterMode || t.mode === "both");
        if (!hasMode) return false;
      }

      // Price level filter
      if (filterPrice !== "all" && location.priceLevel !== filterPrice) return false;

      return true;
    });
  };

  const filteredLocations = getFilteredLocations();
  const activeFiltersCount = [
    filterType !== "all",
    filterTraining !== "all",
    filterLanguage !== "all",
    filterMode !== "all",
    filterPrice !== "all"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilterType("all");
    setFilterTraining("all");
    setFilterLanguage("all");
    setFilterMode("all");
    setFilterPrice("all");
  };

  // Initialize map (only once)
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // justJoinIT inspired style - light, clean, minimalist
    // Using CARTO voyager style (light, similar to justJoinIT)
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
      center: [19.1451, 51.9194], // Polska - środek kraju
      zoom: 6,
      pitch: 0,
      bearing: 0,
    });

    // Clean navigation controls like justJoinIT
    map.current.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
        showZoom: true,
      }),
      "top-right"
    );

    // Optional: Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    // Dodaj style CSS dla animacji
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

  // Update markers when filters change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredLocations.forEach((location) => {
      const markerElement = createCustomMarker(location);

      // Twórz popup z rozszerzonymi informacjami
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

      // Dodaj marker do mapy
      const marker = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom"
      })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);

      // Pokaż popup na hover
      markerElement.addEventListener("mouseenter", () => {
        markerElement.classList.add("marker-hover");
        marker.togglePopup();
      });

      markerElement.addEventListener("mouseleave", () => {
        markerElement.classList.remove("marker-hover");
        // Zakończ hover tylko jeśli popup nie jest w trakcie kliknięcia
        setTimeout(() => {
          if (!markerElement.classList.contains("marker-hover")) {
            marker.togglePopup();
          }
        }, 100);
      });

      // Otwórz modal na kliknięcie w marker
      markerElement.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedLocation(location);
        setIsModalOpen(true);
      });

      // Otwórz modal na kliknięcie w popup
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

    // Listener dla custom event (only once)
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
      {/* Filter Panel - Just Join IT Style */}
      <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-800">Szkoły Lotnicze</h1>
              <span className="text-sm text-gray-500">({filteredLocations.length} z {locations.length})</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Wyczyść filtry ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Filter Buttons Grid */}
          <div className="space-y-4">
            {/* Type Filter */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Typ organizacji</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Wszystkie", color: "gray" },
                  { value: "aeroklub", label: "Aerokluby", color: "violet" },
                  { value: "ato", label: "ATO", color: "emerald" },
                  { value: "dto", label: "DTO", color: "amber" }
                ].map(({ value, label, color }) => (
                  <button
                    key={value}
                    onClick={() => setFilterType(value as any)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${filterType === value
                        ? `bg-${color}-500 text-white shadow-md`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Type Filter */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Typ szkolenia</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Wszystkie" },
                  { value: "PPL(A)", label: "PPL(A)" },
                  { value: "CPL(A)", label: "CPL(A)" },
                  { value: "ATPL(A)", label: "ATPL(A)" },
                  { value: "LAPL(A)", label: "LAPL(A)" },
                  { value: "GLIDER", label: "Szybowce" },
                  { value: "PPL(H)", label: "Śmigłowce" },
                  { value: "FI(A)", label: "Instruktor" }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFilterTraining(value as any)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${filterTraining === value
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language & Mode Filters Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Language Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Język</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "Wszystkie", flag: "" },
                    { value: "polski", label: "Polski", flag: "🇵🇱" },
                    { value: "angielski", label: "Angielski", flag: "🇬🇧" }
                  ].map(({ value, label, flag }) => (
                    <button
                      key={value}
                      onClick={() => setFilterLanguage(value as any)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1
                        ${filterLanguage === value
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                      `}
                    >
                      {flag && <span>{flag}</span>}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Tryb</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "Wszystkie" },
                    { value: "theory", label: "Teoria" },
                    { value: "practice", label: "Praktyka" },
                    { value: "both", label: "Pełne" }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setFilterMode(value as any)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${filterMode === value
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Level Filter */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Poziom cenowy</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Wszystkie", icon: "💰" },
                  { value: 1, label: "Niskie ($)", icon: "💚" },
                  { value: 2, label: "Średnie ($$)", icon: "💛" },
                  { value: 3, label: "Wysokie ($$$)", icon: "❤️" }
                ].map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => setFilterPrice(value as any)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1
                      ${filterPrice === value
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={mapContainer} className="w-full h-full" />

      {/* Side Modal - Just Join IT style */}
      {isModalOpen && selectedLocation && (
        <div
          className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
          style={{ animation: "slideIn 0.3s ease-out" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedLocation.name}</h2>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  {selectedLocation.type === 'aeroklub' ? 'Aeroklub' : selectedLocation.type.toUpperCase()}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-white/90 text-sm">{selectedLocation.description}</p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto h-[calc(100%-200px)]">
            {/* Price Level */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Poziom cenowy</h3>
              <div dangerouslySetInnerHTML={{ __html: createPriceBadge(selectedLocation.priceLevel) }} />
            </div>

            {/* Trainings */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Szkolenia</h3>
              <div className="flex flex-wrap">
                {selectedLocation.trainings.map((training, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: createTrainingTag(training) }} />
                ))}
              </div>
            </div>

            {/* Aircraft */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Flota</h3>
              <div className="space-y-2">
                {selectedLocation.aircraft.map((ac, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✈️</span>
                      <span className="font-medium text-gray-800">{ac.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">×{ac.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Kontakt</h3>
              <div className="space-y-3">
                {selectedLocation.contact.email && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📧</span>
                    <a href={`mailto:${selectedLocation.contact.email}`} className="text-blue-600 hover:underline">
                      {selectedLocation.contact.email}
                    </a>
                  </div>
                )}
                {selectedLocation.contact.phone && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📞</span>
                    <a href={`tel:${selectedLocation.contact.phone}`} className="text-blue-600 hover:underline">
                      {selectedLocation.contact.phone}
                    </a>
                  </div>
                )}
                {selectedLocation.contact.website && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌐</span>
                    <a
                      href={selectedLocation.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Otwórz stronę →
                    </a>
                  </div>
                )}
                {selectedLocation.contact.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <span className="text-gray-700">{selectedLocation.contact.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ICAO Code */}
            {selectedLocation.icao && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Kod ICAO</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="font-mono font-bold text-gray-800">{selectedLocation.icao}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsModalOpen(false)}
        />
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
