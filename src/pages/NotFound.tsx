import React from 'react'
import styles from '../scss/components/NotFound.module.scss'

const NotFound : React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <h2>You have found a secret place.</h2>
      <p>Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.</p>
    </div>
  )
}

export default NotFound;