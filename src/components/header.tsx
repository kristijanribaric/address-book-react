import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';
import styles from '../scss/components/header.module.scss'
import { FaAddressBook } from 'react-icons/fa';

const Header : React.FC = () => {
  return (
    <>
      <nav>
        <div className={styles.logoUserWrapper}>
          <div className={styles.logoContainer}>
            <FaAddressBook className={styles.logo}/>
            <h1>My Address Book</h1>
          </div>
          <div className={styles.userContainer}>
            <p>My email</p>
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