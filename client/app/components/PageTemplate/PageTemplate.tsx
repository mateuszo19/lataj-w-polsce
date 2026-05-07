import Navigation from "@/app/components/Navigation/Navigation";
import {ButtonInterface} from "@/app/interface/button.interface";
import {ReactNode} from "react";

interface PageTemplateProps {
    buttons: ButtonInterface[];
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