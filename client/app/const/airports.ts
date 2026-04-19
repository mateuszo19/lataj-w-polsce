import {Airport} from "@/app/interface/airport.interface";

const maincontrolleds: Airport[] = [
    {
        id: 0,
        name: "Lotnisko Chopina w Warszawie",
        type: "controlled",
        icao: "EPWA",
        position: {
            latitude: 52.1667,
            longitude: 20.9667,
        }
    },
    {
        id: 1,
        name: "Port Lotniczy Kraków-Balice im. Jana Pawła II",
        type: "controlled",
        icao: "EPKK",
        position: {
            latitude: 50.0778,
            longitude: 19.7847,
        }
    },
    {
        id: 2,
        name: "Port Lotniczy Gdańsk-Rębiechowo im. Lecha Wałęsy",
        type: "controlled",
        icao: "EPGD",
        position: {
            latitude: 54.3775,
            longitude: 18.4662,
        }
    },
    {
        id: 3,
        name: "Międzynarodowy Port Lotniczy Katowice-Pyrzowice",
        type: "controlled",
        icao: "EPKT",
        position: {
            latitude: 50.4744,
            longitude: 19.0800,
        }
    },
    {
        id: 4,
        name: "Port Lotniczy Wrocław-Strachowice im. Mikołaja Kopernika",
        type: "controlled",
        icao: "EPWR",
        position: {
            latitude: 51.1028,
            longitude: 16.8858,
        }
    },
    {
        id: 5,
        name: "Port Lotniczy Poznań-Ławica im. Henryka Wieniawskiego",
        type: "controlled",
        icao: "EPPO",
        position: {
            latitude: 52.4211,
            longitude: 16.8267,
        }
    },
    {
        id: 6,
        name: "Port Lotniczy Warszawa-Modlin",
        type: "controlled",
        icao: "EPMO",
        position: {
            latitude: 52.4511,
            longitude: 20.6519,
        }
    },
    {
        id: 7,
        name: "Port Lotniczy Rzeszów-Jasionka",
        type: "controlled",
        icao: "EPRZ",
        position: {
            latitude: 50.1100,
            longitude: 22.0189,
        }
    },
    {
        id: 8,
        name: "Port Lotniczy Szczecin-Goleniów im. NSZZ Solidarność",
        type: "controlled",
        icao: "EPSC",
        position: {
            latitude: 53.5833,
            longitude: 14.9019,
        }
    },
    {
        id: 9,
        name: "Port Lotniczy Lublin-Świdnik",
        type: "controlled",
        icao: "EPLB",
        position: {
            latitude: 51.2353,
            longitude: 22.7158,
        }
    },
    {
        id: 10,
        name: "Port Lotniczy Bydgoszcz-Szwederowo im. I.J. Paderewskiego",
        type: "controlled",
        icao: "EPBY",
        position: {
            latitude: 53.0967,
            longitude: 17.9778,
        }
    },
    {
        id: 11,
        name: "Port Lotniczy Łódź-Lublinek im. Władysława Reymonta",
        type: "controlled",
        icao: "EPLL",
        position: {
            latitude: 51.7217,
            longitude: 19.3983,
        }
    },
    {
        id: 12,
        name: "Port Lotniczy Olsztyn-Mazury (Szymany)",
        type: "controlled",
        icao: "EPSY",
        position: {
            latitude: 53.4792,
            longitude: 20.9358,
        }
    },
    {
        id: 13,
        name: "Port Lotniczy Radom-Sadków (Warszawa-Radom)",
        type: "controlled",
        icao: "EPRA",
        position: {
            latitude: 51.3919,
            longitude: 21.2133,
        }
    },
    {
        id: 14,
        name: "Port Lotniczy Zielona Góra-Babimost",
        type: "controlled",
        icao: "EPZG",
        position: {
            latitude: 52.1408,
            longitude: 15.6025,
        }
    }
];

const uncontrolleds: Airport[] = [
    {
        id: 0,
        name: "Lotnisko Pińczów",
        type: "uncontrolled",
        icao: null,
        supportedVehicles: ['plane'],
        reporter: "Aeroklub Pińczowski ",
        position: {
            latitude: 50.518056,
            longitude: 20.514722,
        }
    },
    {
        id: 1,
        name: "Lotnisko Szymanów",
        type: "uncontrolled",
        icao: "EPWS",
        supportedVehicles: ['plane'],
        reporter: "Aeroklub Polski",
        position: {
            latitude: 51.205833,
            longitude: 16.998333,
        }
    },
    {
        id: 2,
        name: "Wejherowo",
        type: "hospital",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "Szpital Specjalistyczny im. Floriana Ceynowy w Wejherowie",
        position: {
            latitude: 54.611111,
            longitude: 18.244722,
        }
    },
    {
        id: 3,
        name: "Lądowisko Konin-Kazimierz Biskupi",
        type: "uncontrolled",
        icao: "EPKB",
        supportedVehicles: ['plane'],
        reporter: "Aeroklub Koniński",
        position: {
            latitude: 52.319167,
            longitude: 18.166667,
        }
    },
    {
        id: 4,
        name: "Lotnisko Lipki Wielkie",
        type: "uncontrolled",
        icao: null,
        supportedVehicles: ['plane'],
        reporter: "Państwowe Gospodarstwo Leśne Nadleśnictwo Karwin",
        position: {
            latitude: 52.715833,
            longitude: 15.511111,
        }
    },
    {
        id: 5,
        name: "Przemyśl",
        type: "hospital",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "Wojewódzki Szpital im. św. Ojca Pio w Przemyślu",
        position: {
            latitude: 49.8075,
            longitude: 22.779444,
        }
    },
    {
        id: 6,
        name: "Łódź - Szpital Centrum Zdrowia Matki Polki",
        type: "hospital",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "Szpital Centrum Zdrowia Matki Polki w Łodzi ",
        position: {
            latitude: 51.706944,
            longitude: 19.488889,
        }
    },
    {
        id: 7,
        name: "Kalisz - Szpital Wojewódzki",
        type: "hospital",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "Wojewódzki Szpital Zespolony im. Ludwika Perzyny w Kaliszu",
        position: {
            latitude: 51.766111,
            longitude: 18.066389,
        }
    },
    {
        id: 8,
        name: "Radziewice k.Poznania",
        type: "helipad",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "private",
        position: {
            latitude: 52.211111,
            longitude: 16.997222,
        }
    },
    {
        id: 9,
        name: "Goszczanów",
        type: "uncontrolled",
        icao: null,
        supportedVehicles: ['plane'],
        reporter: "Stowarzyszenie Lotnicze",
        position: {
            latitude: 51.786667,
            longitude: 18.485278,
        }
    },
    {
        id: 10,
        name: "Lublin Kraśnicka - Szpital",
        type: "uncontrolled",
        icao: null,
        supportedVehicles: ['helicopter'],
        reporter: "Wojewódzki Szpital Specjalistyczny im. Kardynała Stefana Wyszyńskiego Samodzielny Publiczny Zakład Opieki Zdrowotnej w Lublinie",
        position: {
            latitude: 51.239722,
            longitude: 22.501944,
        }
    }
];

const airports: Airport[] =  [
    ...maincontrolleds,
    ...uncontrolleds
];

export default airports;
