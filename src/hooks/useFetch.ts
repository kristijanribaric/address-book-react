import { useState, useEffect, useCallback } from "react";
import { Contact } from "../models/models";

const useFetch = (url : RequestInfo, isFavorites : boolean) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresher, setRefresher] = useState<boolean>(false);

    const fetchHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();

        const loadedContacts = [];

        for (const key in data) {
            loadedContacts.push({
            id: key,
            firstName: data[key].firstName,
            lastName: data[key].lastName,
            isFavorite: data[key].isFavorite,
            date: data[key].date,
            contactType: data[key].contactType,
            contactNumber: data[key].contactNumber,
            
            });
        }
        if(isFavorites) {
            setContacts(loadedContacts.filter((contact: Contact) =>  contact.isFavorite));
        }
        else {
            setContacts(loadedContacts);
        }
        
        } catch (error:any) {
        setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchHandler();
    }, [fetchHandler, refresher]);

    return {
        contacts,
        isLoading,
        error,
        setRefresher
        
    }
};

export default useFetch;