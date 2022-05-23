import { Contact } from '../models/models.js'
import ContactCard from './contactCard'
import styles from '../scss/components/contactCardList.module.scss'


const ContactCardList : React.FC<{contacts:Contact[], contactNumber : string, activePage : number }> = (props) => {
  let contacts = props.contacts.slice(props.activePage * parseInt(props.contactNumber)  - parseInt(props.contactNumber), props.activePage * parseInt(props.contactNumber));
  

  
  return (
    <>  
      <div className={styles.contactsWrapper}>
        {contacts.map((contact) => <ContactCard key={contact.id} contact={contact}/>)}
      </div>
    </>
  )
}

export default ContactCardList