import styles from '../scss/components/Adresar.module.scss';
import { Loader } from "@mantine/core";
import useFetch from "../hooks/useFetch";
import ContactTable from "../components/contactTable";

const Adresar : React.FC = () => {
  const { contacts, isLoading, error} = useFetch('https://adressbook-b056a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json');
  let content = <p>Found no Contacts.</p>;

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