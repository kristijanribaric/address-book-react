import { Contact } from '../models/models.js'
import ContactCard from './contactCard'
import styles from '../scss/components/contactCardList.module.scss'
import { useContext } from 'react'
import AuthContext from '../store/authContext';
import { showNotification } from '@mantine/notifications'


const ContactCardList : React.FC<{contacts:Contact[], contactNumber : string, activePage : number, changeFavoriteHandler : (isFavorite:boolean, contactId:React.Key|undefined)=>Promise<void>}> = (props) => {
  let contacts = props.contacts.slice(props.activePage * parseInt(props.contactNumber)  - parseInt(props.contactNumber), props.activePage * parseInt(props.contactNumber));
  const authCtx = useContext(AuthContext);
  // const changeFavoriteHandler = async (isFavoriteNEW: boolean, contactId: React.Key | undefined ) => {
  //   console.log(contactId)
  //   try {
  //     const response = await fetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}/.json?auth=${authCtx.token}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify({"isFavorite": isFavoriteNEW}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       if (data && data.error && data.error.message) {
  //         throw new Error(data.error.message);
  //       }
  //       else{
  //         throw new Error('Error.');
  //       }  
  //     }
  //     const data = await response.json();
  //     showNotification({
  //       title: 'Success!',
  //       message: 'Contact successfully favorited!',
  //       autoClose: true,
  //       disallowClose: true,
  //       color : "green",

  //     })
  //   }catch (error:any) {
  //     showNotification({
  //       title: 'Favoriting Contact failed!',
  //       message: error.message,
  //       autoClose: true,
  //       disallowClose: true,
  //       color : "red",
  //     })
  //   }

   


      // const response = await fetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}/isFavorite.json?auth=${authCtx.token}`);
      // if (!response.ok) {
      //     throw new Error('Something went wrong!');
      // }

      // const data = await response.json();

      // console.log(data)
      // } catch (error:any) {
      // console.log(error.message);
      // }

  



  
  return (
    <>  
      <div className={styles.contactsWrapper}>
        {contacts.map((contact) => <ContactCard key={contact.id} contact={contact} changeFavoriteHandler={props.changeFavoriteHandler}/>)}
      </div>
    </>
  )
}

export default ContactCardList