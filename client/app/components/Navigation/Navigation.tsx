import {ButtonInterface} from "@/app/interface/button.interface";

interface NavigationProps {
    buttons: ButtonInterface[]
}

const Navigation = ({ buttons }: NavigationProps) => {

    return (
        <nav className="w-60 bg-red-200 h-full">
            <div className="h-20 w-full bg-blue-400">

            </div>
        </nav>
    )
};

export default Navigation;