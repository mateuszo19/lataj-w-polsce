import Navigation from "@/app/components/Navigation/Navigation";
import {NavButtonInterface} from "@/app/interface/navButton.interface";
import {ReactNode} from "react";

interface PageTemplateProps {
    buttons: NavButtonInterface[];
    children: ReactNode;
}

const PageTemplate = ({buttons, children} : PageTemplateProps) => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <Navigation buttons={buttons} />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    )
};

export default PageTemplate;