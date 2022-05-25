import React, { useContext, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom';
import styles from '../scss/components/header.module.scss'
import { FaAddressBook } from 'react-icons/fa';
import AuthContext from '../store/authContext';
import { Button, Burger, Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { BsInfoLg } from 'react-icons/bs'


const Header : React.FC = () => {
  const [opened, setOpened] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const email = authCtx.email;
  const navigate = useNavigate();
  const signOutHandler = () => {
    authCtx.logout();
    showNotification({
      message: 'User signed out',
      autoClose: true,
      disallowClose: true,
      icon:<BsInfoLg/>
    })
    navigate('/');

  };

  return (
    <>
      <nav>
        <div className={styles.logoUserWrapper}>
          <div className={styles.logoContainer}>
            <FaAddressBook className={styles.logo}/>
            <h1>My Address Book</h1>
          </div>
          <div className={styles.rightContainer}>
            {isLoggedIn && email && <p>{email}</p>}
            {isLoggedIn && <Button onClick={signOutHandler} classNames={{ filled : styles.btn}}>Sign out</Button>}
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} className={styles.burger}  color="#ffff"/>
          </div>
        </div>
        <ul>
              <li><NavLink end to="/adresar" className={(navData) => (navData.isActive? styles.active : styles.tab)}>Address Book</NavLink></li>
              <li><NavLink  to="/adresar/omiljeni" className={(navData) => (navData.isActive ? styles.active : styles.tab)}>Favorites</NavLink></li>
              <li><NavLink to="/kontakt" className={(navData) => (navData.isActive ? styles.active : styles.tab)}>New Contact</NavLink></li>
        </ul>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        classNames={{root: styles.rootModal,inner:styles.inner,modal: styles.modal, header: styles.header, overlay: styles.overlay }}
        transition="slide-down"
        zIndex={15}

      >
        <ul>
                <li><NavLink to="/adresar" onClick={() => setOpened((o) => !o)} className={(navData) => (navData.isActive ? styles.mobileActive : styles.mobileTab)}>Address Book</NavLink></li>
                <li><NavLink to="/kontakt" onClick={() => setOpened((o) => !o)} className={(navData) => (navData.isActive ? styles.mobileActive : styles.mobileTab)}>New Contact</NavLink></li>
                <li><a onClick={signOutHandler} className={styles.mobileTab}>Sign out</a></li>
                <li><p className={styles.mobileEmail}>{authCtx.email}</p></li>
        </ul>
      </Modal>
      </nav>
      
      <Outlet/>
    </>
    
  )
}

export default Header;