import React, { FormEvent, useState, useContext } from 'react'
import SignInForm from '../components/signInForm';
import styles from '../scss/components/SignUp.module.scss'
import { FaAddressBook } from 'react-icons/fa';
import SignUpForm from '../components/signUpForm';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import AuthContext from '../store/authContext';
import { BsCheckLg, BsXLg } from 'react-icons/bs'



const SignIn : React.FC = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  console.log(authCtx)
  const isSignIn = (value : boolean) => {
    setIsLogIn(value);
  };

  const submitHandler = async (username: string, password: string) => {

    setIsLoading(true);
    let url;
    if (isLogIn) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4H4jxTfd4RIBChTv3Y53YFlrJZUKOXtE';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4H4jxTfd4RIBChTv3Y53YFlrJZUKOXtE';
    }
    
    try {
      const  response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: username,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const data = await response.json();
        if (data && data.error && data.error.message) {
          throw new Error(data.error.message);
        }
        else{
          throw new Error('Check your username and password and try again.');
        }  
      }

      const data = await response.json();
      const expirationTime = new Date( new Date().getTime() + +data.expiresIn * 1000);
      authCtx.login(data.idToken, data.email, data.localId, expirationTime.toISOString());
      showNotification({
        title: 'Success!',
        message: 'Login was successful.',
        autoClose: true,
        disallowClose: true,
        color : "green",
        icon: <BsCheckLg/>
      })
      navigate('/adresar', { replace: true });
    } catch (error:any) {
      showNotification({
        title: 'Authentication failed!',
        message: error.message,
        autoClose: true,
        disallowClose: true,
        color : "red",
        icon: <BsXLg/>
      })
    }
    setIsLoading(false);
    
  };
  return (
    <>  
      {isLogIn ? 
        <div className={styles.formWrapper}>
        <FaAddressBook className={styles.logo}/>
          <h1>Welcome back to the adress book!</h1>
          <h2>Please sign in.</h2>
          <SignInForm isSignIn={isSignIn} submitHandler={submitHandler} isLoading={isLoading}/>
        </div> :
        <div className={styles.formWrapper}>
        <FaAddressBook className={styles.logo}/>
          <h1>Welcome to the adress book!</h1>
          <h2>Please sign up.</h2>
          <SignUpForm isSignIn={isSignIn} submitHandler={submitHandler} isLoading={isLoading}/>
        </div>
      }
    </>
   
  )
}

export default SignIn;