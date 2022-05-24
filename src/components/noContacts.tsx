import { Button } from '@mantine/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../scss/components/noContacts.module.scss'

const NoContacts = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper}>
            <p>Found no Contacts.</p>
            <Button classNames={{ filled : styles.btn}} onClick={()=> {navigate('/kontakt')}}>Add new</Button>
        </div>
    )
}

export default NoContacts;