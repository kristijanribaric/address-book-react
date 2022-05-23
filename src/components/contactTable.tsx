import React, { useState} from 'react'
import ContactCardList from './contactCardList';
import ListNumberControl from './listNumberControl';
import { Contact } from '../models/models.js'
import { Pagination } from '@mantine/core';
import styles from '../scss/components/contactTable.module.scss'
import ListFilterControl from './listFilterControl';
import ListSortControl from './listSortControl';

const ContactTable : React.FC <{contacts: Contact[]}> = (props) => {
   const [contactNumber, setContactNumber] = useState("2");
   const [activePage, setPage] = useState<number>(1);
   const [sort, setSort] = useState("asc");
   const [contacts, setContacts] = useState(props.contacts.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0)));
    console.log(contacts)
   const onchangeNumberOfContacts =  (value: string) => {
       setContactNumber(value);
       setPage(1);
    }

    const onChangeSort =  (value: string) => {
        setSort(value);
        switch(value) {
            case 'asc':
                setContacts((prevContacts) => { return prevContacts.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))})
              break;
            case 'desc':
                setContacts((prevContacts) => { return prevContacts.sort((a,b) => (a.lastName < b.lastName) ? 1 : ((b.lastName < a.lastName) ? -1 : 0))})
              break;
            default:
                setContacts((prevContacts) => { return prevContacts.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))})
        }

        
    }

    const onFilteredChange = (filter: String, parameter: string) => {
        switch(parameter) {
            case 'firstName':
                setContacts(props.contacts.filter(contact => {return contact.firstName.toLowerCase().includes(filter.toLowerCase()) }))
              break;
            case 'lastName':
                setContacts(props.contacts.filter(contact => {return contact.lastName.toLowerCase().includes(filter.toLowerCase()) }))
              break;
            case 'email':
                setContacts(props.contacts.filter(contact => {return contact.contactNumber.toLowerCase().includes(filter.toLowerCase()) && contact.contactType === 'Email'}))
                break
            default:
              setContacts(props.contacts.filter(contact => {return contact.firstName.toLowerCase().includes(filter.toLowerCase()) }))
        }
    }
   
  return (
    <div className={styles.wrapper}>
        <div className={styles.controlWrapper}>
            <ListFilterControl onFilteredChange={onFilteredChange}/>
            <div className={styles.rightControlWrapper}>
                <ListNumberControl contactsNumber={contactNumber} onChangeNumber={onchangeNumberOfContacts}/>
                <ListSortControl onChangeSort={onChangeSort} />
                
            </div>  
        </div>
       
        <ContactCardList contacts={contacts} contactNumber={contactNumber} activePage={activePage}/>
        <Pagination total={Math.ceil(contacts.length / parseInt(contactNumber))} page={activePage} onChange={setPage} classNames={{active: styles.active}}/>
    </div>
  )
}

export default ContactTable;