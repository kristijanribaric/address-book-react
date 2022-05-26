import { Key } from "react"

export type  Contact = {
    id?: Key,
    firstName: string,
    lastName: string,
    date?: Date | null,
    isFavorite : boolean,
    contactType: string,
    contactNumber: string,
    author?: string | null | undefined,
};

export interface AuthContextInterface {
    token: string | null | undefined;
    email: string | null | undefined;
    id: string | null | undefined;
    isLoggedIn: boolean;
    login: (value:string, email:string, id: string,expirationTime:string) => void;
    logout: ()=>void;
};

export type Props = {
    children?: React.ReactNode
};