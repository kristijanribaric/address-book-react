import styles from '../scss/components/Detalji.module.scss';
import { useState } from 'react';
import { Loader } from "@mantine/core";
import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import { showNotification } from '@mantine/notifications';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/contactForm';
import { BsCheckLg, BsXLg} from 'react-icons/bs';
import { Contact } from '../models/models';

const Uredi : React.FC = () => {
    let params = useParams();  
    const authCtx = useContext(AuthContext);
    const { contacts, isLoading, error, setRefresher} = useFetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json?auth=${authCtx.token}&orderBy="$key"&equalTo="${params.id}"`, false);
    const [isUpdating, setisUpdating] = useState(false);
    const navigate= useNavigate();
    
   
    const updateContactHandler = async (contact:Contact) => {
        setisUpdating(true);
        try {
          const response = await fetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts/${params.id}.json?auth=${authCtx.token}`, {
            method: 'PATCH',
            body: JSON.stringify(contact),
            headers: {
              'Content-Type': 'application/json'
            }
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
          const data = await response.json();
          showNotification({
            title: 'Success!',
            message: 'Contact successfully updated!',
            autoClose: true,
            disallowClose: true,
            color : "green",
            icon: <BsCheckLg/>
          })
          navigate('/adresar');
        }catch (error:any) {
          showNotification({
            title: 'Updating Contact failed!',
            message: error.message,
            autoClose: true,
            disallowClose: true,
            color : "red",
            icon: <BsXLg/>
          })
        }
        setisUpdating(false);
      }

    
    let content = <p>Contact not found.</p>;

    if (contacts.length === 1) {
        content = <ContactForm upload={updateContactHandler} isLoading={isUpdating} contact={contacts[0]} />;
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

export default Uredi;