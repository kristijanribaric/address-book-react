import styles from '../scss/components/Adresar.module.scss';
import { Loader } from "@mantine/core";
import useFetch from "../hooks/useFetch";
import ContactTable from "../components/contactTable";
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import { showNotification } from '@mantine/notifications';

const Omiljeni : React.FC = () => {
  const authCtx = useContext(AuthContext);
  const { contacts, isLoading, error, setRefresher} = useFetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json?auth=${authCtx.token}&orderBy="author"&equalTo="${authCtx.id}"`, true);
  const changeFavoriteHandler = async (isFavoriteNEW: boolean, contactId: React.Key | undefined ) => {
    try {
      const response = await fetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}/.json?auth=${authCtx.token}`, {
        method: 'PATCH',
        body: JSON.stringify({"isFavorite": isFavoriteNEW}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        if (data && data.error && data.error.message) {
          throw new Error(data.error.message);
        }
        else{
          throw new Error('Error.');
        }  
      }
      const data = await response.json();
      setRefresher(prevValue => !prevValue);
      
    }catch (error:any) {
      showNotification({
        title: 'Favoriting Contact failed!',
        message: error.message,
        autoClose: true,
        disallowClose: true,
        color : "red",
      })
    }
  }

  
  let content = <p>Found no Favorites.</p>;

  if (contacts.length > 0) {
    content = <ContactTable contacts={contacts} changeFavoriteHandler={changeFavoriteHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <Loader className={styles.loader}/>;
  }

  return (
    <section className={styles.wrapper}>
      {content}
    </section>
  )
}

export default Omiljeni;