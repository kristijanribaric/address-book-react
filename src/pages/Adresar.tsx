import styles from '../scss/components/Adresar.module.scss';
import { Loader } from "@mantine/core";
import useFetch from "../hooks/useFetch";
import ContactTable from "../components/contactTable";
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import { useNavigate } from 'react-router-dom';
import NoContacts from '../components/noContacts';

const Adresar : React.FC = () => {
  const authCtx = useContext(AuthContext);
  const author = authCtx.id;
  console.log(authCtx.token)
  // const { contacts, isLoading, error} = useFetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json?orderBy="author"&equalTo="${author}"`);
  const { contacts, isLoading, error} = useFetch(`https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json?auth=${authCtx.token}&orderBy="author"&equalTo="${author}"`);
  console.log(contacts)
  let content = <NoContacts/>;

  if (contacts.length > 0) {
    content = <ContactTable contacts={contacts} />;
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

export default Adresar;