import { Key } from "react"

export type  Contact = {
    id?: Key,
    firstName: String,
    lastName: String,
    date?: Date | null,
    isFavorite : boolean,
    contactType: String,
    contactNumber: String,
    author: string | null | undefined,
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