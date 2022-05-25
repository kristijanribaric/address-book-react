import { Contact } from '../models/models.js';
import React, { Key, useState} from 'react';
import styles from '../scss/components/contactCard.module.scss';
import { Divider } from '@mantine/core';
import {BsStarFill, BsStar } from 'react-icons/bs';

const ContactCard : React.FC<{contact:Contact, changeFavoriteHandler : (isFavorite:boolean, contactId:React.Key|undefined)=>Promise<void>}> = (props) => {

  const changeHandler = () => {
    props.changeFavoriteHandler(!props.contact.isFavorite, props.contact.id);
  }
  
  return (
    <div className={styles.card}>
        <h2>{props.contact.lastName} {props.contact.firstName} <span>{props.contact.isFavorite ? <a ><BsStarFill onClick={()=>changeHandler()}/></a>  : <BsStar onClick={()=>changeHandler()}/>}</span></h2>
        <p><span>{props.contact.contactType} :</span> {props.contact.contactNumber}</p>
        {props.contact?.date && <p><span>Birthday:</span> {`${new Date(props.contact.date).toLocaleDateString("en-EN", {day:'numeric', month: 'long'})}`}</p>}
        <Divider className={styles.divider}/>
    </div>
  )
}

export default ContactCard;