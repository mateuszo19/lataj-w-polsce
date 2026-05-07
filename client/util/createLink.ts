import {UserRole} from "@/app/type/userRole.type";

const createLink = (url: string, role: UserRole | unknown): string => {
    if(!role) return url;

    return `profile/${role}/${url}`;
};

export default createLink;