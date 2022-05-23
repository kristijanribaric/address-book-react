import React from 'react'
import LoginForm from '../components/loginForm';
import styles from '../scss/components/SignUp.module.scss'
import { FaAddressBook } from 'react-icons/fa';



const SignUp : React.FC = () => {
  return (
    <div className={styles.formWrapper}>
      <FaAddressBook className={styles.logo}/>
        <h1>Welcome to the adress book!</h1>
        <h2>Please sign in.</h2>
        <LoginForm/>
    </div>
  )
}

export default SignUp;