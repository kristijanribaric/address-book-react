import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Adresar from './pages/Adresar';
import Kontakt from './pages/Kontakt';
import SignUp from './pages/SignUp';
import Header from './components/header';
import NotFound from './pages/NotFound';
import styles from './scss/components/app.module.scss'


const App : React.FC = () => {
  return (
    <div className={styles.global}>
      <Routes >
        <Route path="/" element={<SignUp/>} />
        <Route path="/*" element={<Header/>} >
          <Route path="adresar" element={<Adresar/>} />
          <Route path="kontakt" element={<Kontakt/>} />
          <Route path="*" element={<NotFound/>} />
        </Route> 
      </Routes>
    </div>
   
  )
}

export default App;