"use client";

import {Filters} from "@/app/interface/filter.interface";

interface FilterProps {
    showFilter: boolean;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

const Switch = ({ label, checked, onChange }: SwitchProps) => {
    return (
        <div className="flex items-center justify-between w-full py-3">
            <label className="text-white text-sm font-medium">{label}</label>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onChange();
                }}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                    checked ? 'bg-[#408A71]' : 'bg-gray-600'
                }`}
            >
                <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                        checked ? 'translate-x-6' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
};

const Filter = ({ showFilter, filters, setFilters } : FilterProps) => {

    const {airports} = filters;

    return (
        <div
            style={{
                right: showFilter ? "0px" : "-384px",
                transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                WebkitMask: 'radial-gradient(circle at top right, transparent 16px, black 16px) top right / 16px 16px no-repeat, black',
            }}
            className="flex flex-col fixed bg-[#37353E] px-2 py-4 w-96 top-0 right-0 h-screen z-[99998] shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">Filtry</h2>
            <div className="flex flex-col items-start w-full mt-6">
                <label className="text-white text-lg font-semibold mb-3">Lotniska</label>
                <div className="w-full border-b border-gray-600 mb-4"/>

                <Switch
                    label="Lotniska kontrolowane"
                    checked={airports.showControlled}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                            ...prev.airports,
                                showControlled: !prev.airports.showControlled
                            }})
                    )}
                />
                <Switch
                    label="Lądowiska niekontrolowane"
                    checked={airports.showUncontrolled}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                                ...prev.airports,
                                showUncontrolled: !prev.airports.showUncontrolled
                            }})
                    )}
                />
                <Switch
                    label="Helipad"
                    checked={airports.showHelipad}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                                ...prev.airports,
                                showHelipad: !prev.airports.showHelipad
                            }})
                    )}
                />
                <Switch
                    label="Lądowiska szpitalne"
                    checked={airports.showHospital}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                                ...prev.airports,
                                showHospital: !prev.airports.showHospital
                            }})
                    )}
                />

            </div>
            <div className="flex flex-col items-start w-full mt-6">
                <label className="text-white text-lg font-semibold mb-3">Ośrodki</label>
                <div className="w-full border-b border-gray-600 mb-4"/>

                <Switch
                    label="DTO"
                    checked={airports.showControlled}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                                ...prev.airports,
                                showControlled: !prev.airports.showControlled
                            }})
                    )}
                />
                <Switch
                    label="ATO"
                    checked={airports.showUncontrolled}
                    onChange={() => setFilters(
                        (prev) => ({ ...prev, airports: {
                                ...prev.airports,
                                showUncontrolled: !prev.airports.showUncontrolled
                            }})
                    )}
                />
            </div>
        </div>
    )
};

export default Filter;