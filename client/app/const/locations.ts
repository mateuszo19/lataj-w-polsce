import { Location } from "@/app/lib/types";

export const locations: Location[] = [
    {
        id: "PL.DTO-47 ",
        slug: "aeroklub-suwalsku",
        name: "Suwalska Szkoła Lotnicza",
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
            { type: "Diamond DA20-A1 Katana", count: 1 }
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
            { type: "Piper PA 28-140 Cherokee", count: 2 }
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
        icao: "EPSU"
    }
];
