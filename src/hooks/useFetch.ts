import { useState, useEffect, useCallback } from "react";

const useFetch = (url : RequestInfo) => {
    const [contacts, setContacts] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            date: data[key].date,
            contactType: data[key].contactType,
            contactNumber: data[key].contactNumber,
            
            });
        }

        setContacts(loadedContacts);
        } catch (error:any) {
        setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);

    return {
        contacts,
        isLoading,
        error
    }
};

export default useFetch;