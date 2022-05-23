import React from 'react'
import ContactForm from '../components/contactForm';
import styles from '../scss/components/Kontakt.module.scss'

const Kontakt : React.FC = () => {
  const addContactHandler = async (contact:any) => {
    console.log(contact)
    const response = await fetch('https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Please enter Contact's information</h1>
        <ContactForm upload={addContactHandler}/>
    </div>
    
  )
}

export default Kontakt;