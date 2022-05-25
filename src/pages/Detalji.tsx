import styles from '../scss/components/Detalji.module.scss';
import { Loader } from "@mantine/core";
import useFetch from "../hooks/useFetch";
import ContactTable from "../components/contactTable";
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import { showNotification } from '@mantine/notifications';
import { useParams } from 'react-router-dom';
import ContactCardDetail from '../components/contactCardDetail';
import { useNavigate } from 'react-router-dom';

const Detalji : React.FC = () => {
    let params = useParams();  
    const navigate= useNavigate();
    const authCtx = useContext(AuthContext);
    const { contacts, isLoading, error, setRefresher} = useFetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json?auth=${authCtx.token}&orderBy="$key"&equalTo="${params.id}"`, false);
    const deleteContactHandler = async (contactId: React.Key | undefined ) => {
        try {
        const response = await fetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}.json?auth=${authCtx.token}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            if (data && data.error && data.error.message) {
            throw new Error(data.error.message);
            }
            else{
            throw new Error('Error.');
            }  
        }
        
        navigate('/adresar', {replace: true});
        
        }catch (error:any) {
        showNotification({
            title: 'Favoriting Contact failed!',
            message: error.message,
            autoClose: true,
            disallowClose: true,
            color : "red",
        })
        }
    }

    
    let content = <p>Contact not found.</p>;

    if (contacts.length === 1) {
        console.log(contacts)
        content = <ContactCardDetail deleteContactHandler={deleteContactHandler} contact={contacts[0]} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <Loader className={styles.loader}/>;
    }

    return (
        <div className={styles.wrapper}>
            {content}
        </div>
    )
}

export default Detalji;