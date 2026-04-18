import { Location } from "@/app/lib/types";

export const locations: Location[] = [
    {
        id: "bialystok-1",
        name: "Aeroklub Białostocki",
        type: "aeroklub",
        coordinates: [23.1811, 53.1030],
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
            email: "kontakt@aeroklub.bialystok.pl",
            phone: "+48 85 745 67 89",
            website: "https://aeroklub.bialystok.pl",
            address: "ul. Porucznika pil. Stanisława Skarżyńskiego 2, 15-693 Białystok"
        },
        icao: "EPBK"
    },
    {
        id: "warszawa-1",
        name: "Aeroklub Warszawski",
        type: "aeroklub",
        coordinates: [20.8926, 52.2593],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski", "angielski"], price: 6750 },
            { type: "LAPL(A)", mode: "both", languages: ["polski", "angielski"], price: 20000 },
            { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 22000 },
            { type: "CPL(A)", mode: "both", languages: ["polski", "angielski"], price: 45000 },
            { type: "NVFR", mode: "both", languages: ["polski", "angielski"], price: 3500 }
        ],
        priceLevel: 2,
        aircraft: [
            { type: "Cessna 150", count: 3 },
            { type: "Cessna 152", count: 4 },
            { type: "Cessna 172", count: 2 },
            { type: "Piper Seneca PA-34", count: 1 },
            { type: "AT-3", count: 1 },
            { type: "SZD-51 Junior", count: 5 },
            { type: "SZD-48 Jantar", count: 3 },
            { type: "SZD-9 Bocian", count: 2 },
            { type: "PW-5", count: 4 }
        ],
        contact: {
            email: "info@aeroklub.waw.pl",
            phone: "+48 22 834 93 35",
            website: "https://www.aeroklub.waw.pl",
            address: "ul. Księżycowa 1, 01-934 Warszawa"
        },
        icao: "EPBC"
    },
    {
        id: "poznan-1",
        name: "Aeroklub Poznański",
        type: "aeroklub",
        coordinates: [16.8268, 52.1177],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7000 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 18000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 21000 },
            { type: "GLIDER", mode: "both", languages: ["polski"], price: 6500 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "Cessna 152", count: 2 },
            { type: "SZD-51 Junior", count: 4 },
            { type: "SZD-48 Jantar", count: 3 },
            { type: "PW-5", count: 3 }
        ],
        contact: {
            email: "aeroklub@aeroklub.poznan.pl",
            phone: "+48 61 813 25 62",
            website: "https://www.aeroklub.poznan.pl",
            address: "Lotnisko Kąkolewo, 64-120 Opokowice"
        },
        icao: "EPPG"
    },
    {
        id: "lublin-1",
        name: "Aeroklub Lubelski",
        type: "aeroklub",
        coordinates: [22.4982, 51.2415],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski", "angielski"], price: 7200 },
            { type: "LAPL(A)", mode: "both", languages: ["polski", "angielski"], price: 19000 },
            { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 23000 },
            { type: "NVFR", mode: "both", languages: ["polski", "angielski"], price: 4000 }
        ],
        priceLevel: 2,
        aircraft: [
            { type: "Cessna 152", count: 3 },
            { type: "Cessna 172N", count: 2 },
            { type: "Socata TB", count: 1 },
            { type: "SZD-51 Junior", count: 4 },
            { type: "SZD-30 Pirat", count: 2 }
        ],
        contact: {
            email: "biuro@aeroklub.lublin.pl",
            phone: "+48 81 503 07 90",
            website: "https://www.aeroklub.lublin.pl",
            address: "Radawiec Duży 272A, 21-030 Motycz"
        },
        icao: "EPLR"
    },
    {
        id: "krakow-1",
        name: "Aeroklub Krakowski",
        type: "aeroklub",
        coordinates: [19.9536, 50.0777],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 6800 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 17500 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 20000 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "Cessna 172", count: 1 },
            { type: "SZD-51 Junior", count: 3 },
            { type: "SZD-48 Jantar", count: 2 }
        ],
        contact: {
            email: "aeroklub.krakowski@gmail.com",
            phone: "+48 12 294 21 44",
            website: "https://aeroklub.krakow.pl",
            address: "ul. Marysii z niej, 30-372 Kraków"
        },
        icao: "EPKC"
    },
    {
        id: "gdansk-1",
        name: "Aeroklub Gdański",
        type: "aeroklub",
        coordinates: [18.4475, 54.3776],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski", "angielski"], price: 7500 },
            { type: "LAPL(A)", mode: "both", languages: ["polski", "angielski"], price: 19500 },
            { type: "PPL(A)", mode: "both", languages: ["polski", "angielski"], price: 22500 }
        ],
        priceLevel: 2,
        aircraft: [
            { type: "Cessna 152", count: 2 },
            { type: "Cessna 172", count: 1 },
            { type: "SZD-51 Junior", count: 3 },
            { type: "SZD-9 Bocian", count: 2 }
        ],
        contact: {
            email: "kontakt@aeroklub.gdansk.pl",
            phone: "+48 58 341 25 11",
            website: "https://www.aeroklub.gdansk.pl",
            address: "ul. Plaży 5, 80-680 Gdańsk-Przeróbka"
        },
        icao: "EPGD"
    },
    {
        id: "wroclaw-1",
        name: "Aeroklub Wrocławski",
        type: "aeroklub",
        coordinates: [16.8844, 51.1027],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7000 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 18000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 21000 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "SZD-51 Junior", count: 3 },
            { type: "SZD-48 Jantar", count: 2 }
        ],
        contact: {
            email: "kontakt@aeroklub.wroclaw.pl",
            phone: "+48 71 327 54 22",
            website: "https://www.aeroklub.wroclaw.pl",
            address: "ul. Szybowcowa 1, 54-051 Wrocław"
        },
        icao: "EPWR"
    },
    {
        id: "lodz-1",
        name: "Aeroklub Łódzki",
        type: "aeroklub",
        coordinates: [19.4380, 51.7394],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 6800 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 17000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 19500 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "SZD-30 Pirat", count: 3 },
            { type: "SZD-51 Junior", count: 2 }
        ],
        contact: {
            email: "aeroklub.lodzki@interia.pl",
            phone: "+48 42 683 20 58",
            website: "https://www.aeroklub.lodz.pl",
            address: "ul. Szpitalna 5, 91-261 Łódź"
        },
        icao: "EPLL"
    },
    {
        id: "katowice-1",
        name: "Aeroklub Katowicki",
        type: "aeroklub",
        coordinates: [19.0801, 50.4743],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7200 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 18500 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 21500 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "Cessna 172", count: 1 },
            { type: "SZD-51 Junior", count: 3 }
        ],
        contact: {
            email: "kontakt@aeroklub.katowice.pl",
            phone: "+48 32 256 12 34",
            website: "https://www.aeroklub.katowice.pl",
            address: "ul. Lotnisko 11, 40-285 Katowice"
        },
        icao: "EPKT"
    },
    {
        id: "szczecin-1",
        name: "Aeroklub Szczeciński",
        type: "aeroklub",
        coordinates: [14.6355, 53.4294],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7000 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 18000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 20500 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 152", count: 2 },
            { type: "SZD-51 Junior", count: 2 },
            { type: "SZD-9 Bocian", count: 1 }
        ],
        contact: {
            email: "kontakt@aeroklub.szczecin.pl",
            phone: "+48 91 434 35 22",
            website: "https://www.aeroklub.szczecin.pl",
            address: "ul. Ku Słońcu 49, 70-755 Szczecin"
        },
        icao: "EPSC"
    },
    {
        id: "bydgoszcz-1",
        name: "Aeroklub Bydgoski",
        type: "aeroklub",
        coordinates: [18.0120, 53.0950],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 6800 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 17500 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 20000 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "SZD-51 Junior", count: 3 },
            { type: "SZD-48 Jantar", count: 2 }
        ],
        contact: {
            email: "aeroklub.bydgoski@wp.pl",
            phone: "+48 52 345 67 89",
            website: "https://www.aeroklub.bydgoszcz.pl",
            address: "ul. Szpitalna 65, 85-915 Bydgoszcz"
        },
        icao: "EPBD"
    },
    {
        id: "rzeszow-1",
        name: "Aeroklub Rzeszowski",
        type: "aeroklub",
        coordinates: [22.0498, 50.1105],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7200 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 19000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 22000 }
        ],
        priceLevel: 2,
        aircraft: [
            { type: "Cessna 150", count: 1 },
            { type: "Cessna 152", count: 1 },
            { type: "SZD-51 Junior", count: 2 }
        ],
        contact: {
            email: "kontakt@aeroklub.rzeszow.pl",
            phone: "+48 17 853 22 11",
            website: "https://www.aeroklub.rzeszow.pl",
            address: "ul. Jasionka 954, 36-001 Jasionka"
        },
        icao: "EPRZ"
    },
    {
        id: "torun-1",
        name: "Aeroklub Toruński",
        type: "aeroklub",
        coordinates: [18.5984, 53.0138],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 6900 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 17800 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 20200 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 2 },
            { type: "SZD-30 Pirat", count: 2 },
            { type: "SZD-51 Junior", count: 2 }
        ],
        contact: {
            email: "kontakt@aeroklub.torun.pl",
            phone: "+48 56 621 34 56",
            website: "https://www.aeroklub.torun.pl",
            address: "ul. Szybowcowa 3, 87-100 Toruń"
        },
        icao: "EPTO"
    },
    {
        id: "zielona-gora-1",
        name: "Aeroklub Ziemi Lubuskiej",
        type: "aeroklub",
        coordinates: [15.5064, 51.9356],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 6700 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 17000 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 19500 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 150", count: 1 },
            { type: "SZD-51 Junior", count: 2 },
            { type: "SZD-30 Pirat", count: 2 }
        ],
        contact: {
            email: "kontakt@azl.zgora.pl",
            phone: "+48 68 456 78 90",
            website: "https://www.azl.zgora.pl",
            address: "Lotnisko Zielona Góra-Babimost, 66-003 Zielona Góra"
        },
        icao: "EPZG"
    },
    {
        id: "olsztyn-1",
        name: "Aeroklub Warmińsko-Mazurski",
        type: "aeroklub",
        coordinates: [20.4942, 53.4285],
        trainings: [
            { type: "SPL", mode: "both", languages: ["polski"], price: 7100 },
            { type: "LAPL(A)", mode: "both", languages: ["polski"], price: 18200 },
            { type: "PPL(A)", mode: "both", languages: ["polski"], price: 20800 }
        ],
        priceLevel: 1,
        aircraft: [
            { type: "Cessna 152", count: 1 },
            { type: "SZD-51 Junior", count: 2 },
            { type: "SZD-9 Bocian", count: 1 }
        ],
        contact: {
            email: "kontakt@aeroklub.olsztyn.pl",
            phone: "+48 89 523 45 67",
            website: "https://www.aeroklub.olsztyn.pl",
            address: "ul. lotnisko 3, 10-161 Olsztyn"
        },
        icao: "EPSY"
    }
];
