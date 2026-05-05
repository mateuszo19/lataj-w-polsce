import { Location } from "@/app/lib/types";

export const locations: Location[] = [
    //     {
    //     id: "PL.DTO-14",
    //     slug: "aeroklub-leszczynski",
    //     name: "Aeroklub Leszczyński ",
    //     imageUri: undefined,
    //     type: "dto",
    //     coordinates: [16.53351699695128, 51.83371757033508],
    //     offer: [
    //         "Szkolenie teoretyczne i praktyczne do PPL(A)",
    //         "Szkolenie teoretyczne i praktyczne do SPL",
    //         "Szkolenie w zakresie dodatkowych metod startu zgodnie z SFCL.155",
    //         "Szkolenie na dodatkowe uprawnienia instruktora szkolenia praktycznego FI(S)",
    //         "Szkolenie samolotowe do uprawnienia dodatkowego: holowanie szybowców, do wykonywania lotów nocnych",
    //         "Szkolenie teoretyczne i praktyczne BPL (balon na ogrzane powietrze)",
    //         "Szkolenie teoretyczne i praktyczne na uprawnienie na klasę SEP(lądowych)"
    //     ],
    //     trainings: [
    //         {
    //             id: 0,
    //             type: "PPL(A)", mode: "practice", languages: ["polski"], price: 33170 },
    //         {
    //             id: 1,
    //             type: "LAPL(A)", mode: "both", languages: ["polski"], price: 7700 }
    //     ],
    //     aircraft: [
    //         { type: "Diamond DA20-A1 Katana", category: 'plane'}
    //     ],
    //     contact: {
    //         cell: [
    //             {
    //                 name: "Biuro",
    //                 email: "biuro@aeroklub.leszno.pl"
    //             },
    //             {
    //                 name: "Dyrektor",
    //                 phone: "+48 517 542 268",
    //                 email: "dyrektor@aeroklub.leszno.pl"
    //             }
    //         ],
    //         website: "https://aeroklub.leszno.pl/",
    //         address: "ul. Szybowników 28 64-100 Leszno"
    //     },
    //     icao: "EPLS"
    // },
    {
        id: "PL.DTO-21",
        slug: "avair",
        name: "EVAAIR",
        imageUri: "https://evair.pl/wp-content/uploads/2022/10/EVAIR-logo_svg_web.svg",
        type: "dto",
        coordinates: [20.903721368141117, 52.26651819949274 ],
        offer: [
            "Szkolenie teoretyczne i praktyczne do LAPL(A) i PPL(A)",
            "Szkolenie samolotowe do uprawnienia dodatkowego: do wykonywania lotów nocnych, akrobacja na samolotach",
            "Instruktorskie szkolenie odświeżające dla FI(S)"
        ],
            trainings: [
                {
                    id: 0,
                    type: "PPL(A)", mode: "practice", languages: ["polski"], price: undefined },
                {
                    id: 1,
                    type: "LAPL(A)", mode: "both", languages: ["polski"], price: undefined }
            ],
        aircraft: [],
        contact: {
            cell: [
                {
                    name: "Biuro",
                    phone: "+48 790 631 313",
                    email: "biuro@evair.pl"
                },
                {
                    name: "Biuro",
                    phone: "+48 502 921 017",
                    email: ""
                }
            ],
            website: "https://evair.pl/",
            address: "Kaliskiego 57 Lotnisko Warszawa Babice"
        },
        icao: "EPVA"
    },
    {
        id: "PL.DTO-47 ",
        slug: "aeroklub-suwalsku",
        name: "Suwalska Szkoła Lotnicza",
        imageUri: "https://www.aeroklubsuwalski.pl/wp-content/uploads/2025/07/Logo2_retina-252x68.png",
        type: "dto",
        coordinates: [22.905558269716135, 54.0719183811149],
        offer: [
            "Szkolenie teoretyczne i praktyczne do LAPL(A) i PPL(A)",
            "Szkolenie teoretyczne i praktyczne na uprawnienie na klasę SEP(lądowych)",
            "Szkolenie samolotowe teoretyczne i praktyczne na dodatkowe uprawnienia: do wykonywania lotów nocnych",
            "Szkolenie teoretyczne i praktyczne do SPL",
            "Szkolenie w zakresie dodatkowych metod startu zgodnie z SFCL.155"
        ],
        trainings: [
            {
                id: 0,
                type: "PPL(A)", mode: "practice", languages: ["polski"], price: 33170 },
            {
                id: 1,
                type: "LAPL(A)", mode: "both", languages: ["polski"], price: 7700 }
        ],
        aircraft: [
            { type: "Diamond DA20-A1 Katana", category: 'plane'}
        ],
        contact: {
            cell: [
                {
                    name: "Dyrektor",
                    phone: "+48 720 733 337",
                    email: "lotnisko.suwalki@gmail.com"
                },
                {
                    name: "Szkolenia",
                    phone: "+48 570 722 227",
                    email: "aeroklubsuwalski@gmail.com"
                }
            ],
            website: "https://www.aeroklubsuwalski.pl",
            address: "ul. Wojczyńskiego 1 16-400 Suwałki"
        },
        icao: "EPSU"
    },
    {
        id: "PL.DTO-51 ",
        slug: "skywings",
        name: "Szkoła Pilotażu SKYWINGS",
        imageUri: "https://skywings.aero/wp-content/uploads/2020/08/SKYWINGslogos.png",
        type: "dto",
        coordinates: [20.736259306928478, 50.889860622629094 ],
        offer: [
            "Szkolenie praktyczne do LAPL(A) i PPL(A)",
            "Szkolenie teoretyczne i praktyczne na uprawnienie na klasę SEP(lądowych)",
            "Szkolenie samolotowe do uprawnienia dodatkowego: do wykonywania lotów nocnych"

        ],
        trainings: [
            {
                id: 0,
                type: "PPL(A)", mode: "practice", languages: ["polski"], price: undefined },
            {
                id: 1,
                type: "LAPL(A)", mode: "practice", languages: ["polski"], price: undefined }
        ],
        aircraft: [
            { type: "Piper PA 28-140 Cherokee", category: 'plane'},
            { type: "Piper PA 28-140 Cherokee", category: 'plane'}
        ],
        contact: {
            cell: [
                {
                    name: "DTO",
                    phone: "+48 603 216 667",
                    email: "biuro@skywings.aero"
                },
                {
                    name: "DTO",
                    phone: "+48 531 190 553",
                    email: ""
                }
            ],
            website: "https://skywings.aero",
            address: "ul. Bukowa 3, 26-001 Wola Kopcowa"
        },
        icao: undefined
    },
    {
        id: "PL.DTO-117 ",
        slug: "aeroklub-kielecki",
        name: "Aeroklub Kielecki",
        type: "dto",
        coordinates: [20.72738908340372, 50.902227964878044 ],
        offer: [
            "Szkolenie teoretyczne i praktyczne do SPL",
            "Szkolenie w zakresie dodatkowych metod startu zgodnie z SFCL.155",
            "Szkolenie na dodatkowe uprawnienia instruktora szkolenia praktycznego FI(S)",
            "Instruktorskie szkolenie odświeżające dla FI(S)"

        ],
        trainings: [
            {
                id: 0,
                type: "SPL", mode: "theory", languages: ["polski"], price: 1399
            },
            {
                id: 1,
                type: "SPL", mode: "practice", languages: ["polski"], price: 5099,
                notice: "za wyciągarką (limit 60 lotów)"
            },
            {
                id: 2,
                type: "SPL", mode: "practice", languages: ["polski"], price: 9600,
                notice: "za samolotem (limit 40 lotów)"
            }
        ],
        aircraft: [
            { type: "Tecnam P2002 JF Sierra", registration: "SP-AKE", category: 'plane' },
            { type: "Piper PA-28 Arrow", registration: "SP-ASP", category: 'plane' },
            { type: "Cessna 152", registration: "SP-KIW", category: 'plane' },
            { type: "Tecnam P2002 JF Sierra", registration: "SP-AKA", category: 'plane' },
            { type: "Tecnam P2002 JF Sierra", registration: "SP-AKI", category: 'plane' },
            { type: "Piper PA-28-140 Cherokee", registration: "SP-SWA", category: 'plane' },
            { type: "SZD-9BIS 1E BOCIAN", registration: "SP-2758", category: 'glider' },
            { type: "SZD 50-3 PUCHACZ", registration: "SP-3409", category: 'glider'},
            { type: "SZD 50-3 PUCHACZ", registration: "SP-3210", category: 'glider'},
            { type: "SZD-30 PIRAT", registration: "SP-2575", category: 'glider', },
            { type: "SZD-30 PIRAT", registration: "SP-2714", category: 'glider', },
            { type: "SZD-30 PIRAT", registration: "SP-3020", category: 'glider', },
            { type: "SZD-30 PIRAT", registration: "SP-2838", category: 'glider', },
            { type: "SZD-51-1 JUNIOR", registration: "SP-3503", category: 'glider'},
            { type: "SZD-51-1 JUNIOR", registration: "SP-3425", category: 'glider'},
            { type: "SZD-48-3 JANTAR STANDARD 3", registration: "SP-3539", category: 'glider'},
            { type: "SZD-48-3 JANTAR STANDARD 3", registration: "SP-3375", category: 'glider'},
            { type: "SZD-36 COBRA", category: 'glider', registration: "SP-2902"},
        ],
        contact: {
            cell: [
                {
                    name: "DTO",
                    phone: "+48 603 216 667",
                    email: "biuro@skywings.aero"
                },
                {
                    name: "DTO",
                    phone: "+48 531 190 553",
                    email: ""
                }
            ],
            website: "https://aeroklubkielecki.pl/",
            address: "ul. Bukowa 3, 26-001 Wola Kopcowa"
        },
        icao: undefined
    }
];
