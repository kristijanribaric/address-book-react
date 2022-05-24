import React, { useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom';
import styles from '../scss/components/header.module.scss'
import { FaAddressBook } from 'react-icons/fa';
import AuthContext from '../store/authContext';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { BsInfoLg } from 'react-icons/bs'


const Header : React.FC = () => {
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
          </div>
        </div>
        <ul>
              <li><NavLink to="/adresar" className={(navData) => (navData.isActive ? styles.active : styles.tab)}>Address Book</NavLink></li>
              <li><NavLink to="/kontakt" className={(navData) => (navData.isActive ? styles.active : styles.tab)}>New Contact</NavLink></li>
        </ul>
      </nav>
       
      <Outlet/>
    </>
    
  )
}

export default Header;