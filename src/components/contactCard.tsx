import { Contact } from '../models/models.js'
import React from 'react';
import styles from '../scss/components/contactCard.module.scss'
import { Divider } from '@mantine/core';

const ContactCard : React.FC<{contact:Contact}> = (props) => {
  return (
    <div className={styles.card}>
        <h2>{props.contact.lastName} {props.contact.firstName}</h2>
        <p><span>{props.contact.contactType} :</span> {props.contact.contactNumber}</p>
        {props.contact?.date && <p><span>Birthday:</span> {`${new Date(props.contact.date).toLocaleDateString("en-EN", {day:'numeric', month: 'long'})}`}</p>}
        <Divider className={styles.divider}/>
    </div>
  )
}

export default ContactCard;