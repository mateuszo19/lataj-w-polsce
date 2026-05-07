export interface NavButtonInterface {
    text: string;
    icon: React.ReactNode;
    link?: string;
    onClick?: () => void;
}