import { Contact } from '../models/models.js';
import React, { Key, useState} from 'react';
import styles from '../scss/components/contactCard.module.scss';
import { Divider } from '@mantine/core';
import {BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const ContactCard : React.FC<{contact:Contact, changeFavoriteHandler : (isFavorite:boolean, contactId:React.Key|undefined)=>Promise<void>}> = (props) => {

  const changeHandler = () => {
    props.changeFavoriteHandler(!props.contact.isFavorite, props.contact.id);
  }

  

  return (
    
      <div className={styles.card}>
          <h2><Link to={`/kontakt/detalji/${props.contact.id}`}>{props.contact.lastName} {props.contact.firstName} </Link> <span className={styles.star}>{props.contact.isFavorite ? <a ><BsStarFill onClick={()=>changeHandler()}/></a>  : <BsStar onClick={()=>changeHandler()}/>}</span></h2>
          <Divider className={styles.divider}/>
      </div>
    
  )
}

export default ContactCard;