import React, { useState } from 'react'
import { Contact } from '../models/models';
import styles from '../scss/components/contactCardDetail.module.scss'
import { BsFillTelephoneFill, BsPhoneFill } from 'react-icons/bs'
import {FaPager,FaBirthdayCake} from 'react-icons/fa'
import { MdAlternateEmail,MdDelete, MdModeEdit } from 'react-icons/md'
import { Button, Modal, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';

const ContactCardDetail : React.FC<{contact: Contact, deleteContactHandler: (id :React.Key | undefined)=>Promise<void>}> = (props) => {
  const [opened, setOpened] = useState(false);
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

  const modalHandler = () => {
    setOpened(false);
    props.deleteContactHandler(props.contact.id)
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Are you sure you want to delete this contact?"
        centered={true}
      > 
        <div className={styles.modalContainer}>
        <Button classNames={{ filled : styles.yes}} onClick={modalHandler}>Yes</Button>
        <Button classNames={{ filled : styles.no}} onClick={() => setOpened(false)}>No</Button>
        </div>
       
      </Modal>
      <div className={styles.titleContainer}>
      <h2 className={styles.name}>{props.contact.lastName} {props.contact.firstName}  </h2>
      <div className={styles.actionContainer}>
        <ActionIcon onClick={()=>{setOpened(true)}} className={styles.delete}>
          <MdDelete size={24}/>
        </ActionIcon>
        <ActionIcon>
          <Link to={`/kontakt/uredi/${props.contact.id}`}>
            <MdModeEdit size={24} className={styles.edit}/>
          </Link>
        </ActionIcon>
      </div>
      </div>
   
    <p><span className={styles.contactType}>{icon}{props.contact.contactType}:</span> <span className={styles.contactNumber}>{props.contact.contactNumber}</span> </p>
    {props.contact?.date && <p><span className={styles.birthday}><FaBirthdayCake className={styles.icon}/> Birthday:</span> {`${new Date(props.contact.date).toLocaleDateString("en-EN", {day: '2-digit', month: 'long'})}`}</p>}
   
    </>
  )
}

export default ContactCardDetail;