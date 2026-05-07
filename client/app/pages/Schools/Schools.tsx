import PageTemplate from "@/app/components/PageTemplate/PageTemplate";
import {Bell, Inbox} from "lucide-react";
import {locations} from "@/app/const/locations";

const Schools = () => {
    return (
        <div className="flex flex-col gap-12 w-full h-full p-6">
            <div className="flex w-full gap-4">
                <input
                    className="border grow box-border border-gray-300 rounded-xl py-4 px-2"
                    placeholder="Szukaj"
                    type="text"/>
                <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-full flex items-center justify-center border box-border border-gray-300">
                        <Inbox />
                    </div>
                    <div className="h-14 w-14 rounded-full flex items-center justify-center border box-border border-gray-300">
                        <Bell />
                    </div>
                </div>
            </div>
            <table className="w-full border-collapse border border-gray-300 rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Numer ref.</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Nazwa</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Adres</th>
                    </tr>
                </thead>
                <tbody>
                {locations.map((location) => (
                    <tr key={location.id}>
                        <td className="border border-gray-300 px-4 py-3">{location.id}</td>
                        <td className="border border-gray-300 px-4 py-3">{location.name}</td>
                        <td className="border border-gray-300 px-4 py-3">{location.contact.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Schools;