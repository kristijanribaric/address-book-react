import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Adresar from './pages/Adresar';
import Kontakt from './pages/Kontakt';
import SignIn from './pages/SignIn';
import Header from './components/header';
import NotFound from './pages/NotFound';
import styles from './scss/components/app.module.scss'
import { NotificationsProvider } from '@mantine/notifications';
import { useContext } from 'react';
import AuthContext from './store/authContext';
import Omiljeni from './pages/Omiljeni';
import Detalji from './pages/Detalji';
import Uredi from './pages/Uredi';


const App : React.FC = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.global}>
      <NotificationsProvider autoClose={3000} position="top-center">
          {authCtx.isLoggedIn ?  
            <Routes>
              <Route path="/" element={<Navigate to="/adresar" replace />} />
              <Route path="/*" element={<Header/>} >
              <Route path="adresar" >
                <Route index={true} element={<Adresar/>}/>
                <Route path="omiljeni" element={<Omiljeni/>} />
              </Route>
             
              <Route path="kontakt">
                <Route index={true} element={<Kontakt/>} />
                <Route path="detalji/:id" element={<Detalji/>} />
                <Route path="uredi/:id" element={<Uredi/>} />
              </Route>
              
              <Route path="*" element={<NotFound/>} />
              </Route>
            </Routes> : 
            <Routes>
              <Route path="/" element={<SignIn/>} />
              <Route path="/*" element={<Navigate to="/" replace />}/>
            </Routes>
          }
          
      
          
        
      </NotificationsProvider>
    </div>
   
  )
}

export default App;