import React from 'react'
import { Contact } from '../models/models';
import styles from '../scss/components/contactCardDetail.module.scss'
import { BsFillTelephoneFill, BsPhoneFill } from 'react-icons/bs'
import {FaPager,FaBirthdayCake} from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'

const ContactCardDetail : React.FC<{contact: Contact}> = (props) => {

    let icon :any;
  
  switch(props.contact.contactType) {
    case "Cellphone":
      icon = <BsPhoneFill className={styles.icon}/>;
      break;
    case "Telephone":
      icon = <BsFillTelephoneFill className={styles.icon}/>;
      break;
    case "Email":
      icon = <MdAlternateEmail className={styles.icon}/>;
      break;
    case "Pager":
      icon = <FaPager className={styles.icon}/>;
      break;
    default:
      icon = <></>;
  }
  return (
    <>
    <h2 className={styles.name}>{props.contact.lastName} {props.contact.firstName}</h2>
    <p><span className={styles.contactType}>{icon}{props.contact.contactType}:</span> <span className={styles.contactNumber}>{props.contact.contactNumber}</span> </p>
    {props.contact?.date && <p><span className={styles.birthday}><FaBirthdayCake className={styles.icon}/> Birthday:</span> {`${new Date(props.contact.date).toLocaleDateString("en-EN", {day: '2-digit', month: 'long'})}`}</p>}
    </>
  )
}

export default ContactCardDetail;