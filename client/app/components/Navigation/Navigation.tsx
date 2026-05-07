import {NavButtonInterface} from "@/app/interface/navButton.interface";
import {LogOut, Settings} from "lucide-react";

import {SignOutButton} from "@clerk/nextjs";
import Link from "next/link";

interface NavigationProps {
    buttons: NavButtonInterface[];
    contacts?: NavButtonInterface[];
}

const NavigationButton = (props: NavButtonInterface) => {
    if (props.link) {
        return (
            <Link
                href={`/${props.link}`}
                className="flex items-center py-1 px-2 gap-2 hover:bg-[#facc1599] rounded-xl"
            >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50">
                    {props.icon}
                </div>
                <span>{props.text}</span>
            </Link>
        );
    }

    if (props.onClick) {
        return (
            <button
                onClick={props.onClick}
                className="flex items-center py-1 px-2 gap-2 hover:bg-[#facc1599] rounded-xl"
            >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50">
                    {props.icon}
                </div>
                <span>{props.text}</span>
            </button>
        );
    }

    return null;
};

const Navigation = ({ buttons, contacts }: NavigationProps) => {
    return (
        <nav className="w-60 h-full shadow-2xl flex flex-col">
            <div className="h-20 w-full bg-blue-400">

            </div>
            <div className="flex flex-col">
                <div className="flex flex-col gap-2 p-4">
                    <span className="text-sm font-normal">Sekcje</span>
                    <div className="flex flex-col gap-2">
                        {buttons.map((button: NavButtonInterface) => (
                            <NavigationButton key={button.text} icon={button.icon} text={button.text} onClick={button.onClick} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <span className="text-sm font-normal">Kontakty</span>
                    <div className="flex flex-col gap-2">
                        {contacts ? contacts.map((button: NavButtonInterface) => (
                            <NavigationButton key={button.text} icon={button.icon} text={button.text} onClick={button.onClick} />
                        )) : <div className="p-3">
                            <p className="text-xs font-semibold">brak kontaktów</p>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-end grow gap-2 p-4">
                <span className="text-sm font-normal">Ustawienia</span>
                <div className="flex flex-col gap-2">
                    <NavigationButton icon={<Settings size={20}/>} text="Ustawienia" />
                    <div className="flex flex-col gap-2">
                        <SignOutButton>
                            <button
                                className="flex items-center py-1 px-2 gap-2 hover:bg-[#facc1599] rounded-xl"
                            >
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50">
                                    <LogOut size={20}/>
                                </div>
                                <span>Wyloguj</span>
                            </button>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navigation;