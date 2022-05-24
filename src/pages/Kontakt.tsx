import React, { useState } from 'react'
import ContactForm from '../components/contactForm';
import { Contact } from '../models/models';
import styles from '../scss/components/Kontakt.module.scss'
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg, BsXLg } from 'react-icons/bs'

const Kontakt : React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const addContactHandler = async (contact:Contact) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', {
        method: 'POST',
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
        message: 'Contact successfully uploaded!',
        autoClose: true,
        disallowClose: true,
        color : "green",
        icon: <BsCheckLg/>
      })
      navigate('/adresar');
    }catch (error:any) {
      showNotification({
        title: 'Uploading Contact failed!',
        message: error.message,
        autoClose: true,
        disallowClose: true,
        color : "red",
        icon: <BsXLg/>
      })
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Please enter Contact's information</h1>
        <ContactForm upload={addContactHandler} isLoading={isLoading}/>
    </div>
    
  )
}

export default Kontakt;