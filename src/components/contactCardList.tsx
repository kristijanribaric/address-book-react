import { Contact } from '../models/models.js'
import ContactCard from './contactCard'
import styles from '../scss/components/contactCardList.module.scss'
import { useContext } from 'react'
import AuthContext from '../store/authContext';

const ContactCardList : React.FC<{contacts:Contact[], contactNumber : string, activePage : number, changeFavoriteHandler : (isFavorite:boolean, contactId:React.Key|undefined)=>Promise<void>}> = (props) => {
  let contacts = props.contacts.slice(props.activePage * parseInt(props.contactNumber)  - parseInt(props.contactNumber), props.activePage * parseInt(props.contactNumber));
  const authCtx = useContext(AuthContext);

  return (
    <>  
      <div className={styles.contactsWrapper}>
        {contacts.map((contact) => <ContactCard key={contact.id} contact={contact} changeFavoriteHandler={props.changeFavoriteHandler}/>)}
      </div>
    </>
  )
}

export default ContactCardList