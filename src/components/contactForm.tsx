import React, { useState } from 'react';
import styles from '../scss/components/contactForm.module.scss'
import useInput from '../hooks/useInput';
import { TextInput, Divider, Select, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const ContactForm : React.FC<{upload : (data:{})=>{}}> = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandlerText: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput(value => value.trim().length < 100 && value.trim() !== '');

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandlerText: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput(value => value.trim().length < 300 && value.trim() !== '');

    const {
        value: enteredContactNumber,
        isValid: enteredContactNumberIsValid,
        hasError: contactNumberInputHasError,
        valueChangeHandlerText: contactNumberChangedHandler,
        inputBlurHandler: contactNumberBlurHandler,
        reset: resetContactNumberInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredContactType,
        isValid: enteredContactTypeIsValid,
        hasError: contactTypeInputHasError,
        valueChangeHandlerSelect: contactTypeChangedHandler,
        inputBlurHandler: contactTypeBlurHandler,
        reset: resetContactTypeInput
    } = useInput(value => value.trim() !== '');


    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault(); 
        firstNameBlurHandler();
        lastNameBlurHandler();
        contactNumberBlurHandler();
        contactTypeBlurHandler();
    
        if (!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredContactNumberIsValid || !enteredContactTypeIsValid ) {
          return;
        }
       
        props.upload({firstName: enteredFirstName, lastName: enteredLastName, date: enteredDate, contactType: enteredContactType, contactNumber: enteredContactNumber})
        
    
        resetFirstNameInput();
        resetLastNameInput();
        resetContactNumberInput();
        resetContactTypeInput();
    
      };

    const [enteredDate, setenteredDate] = useState<Date | null>(null);
    const [contactType, setcontactType] = useState('');

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}> 
        <TextInput
            placeholder="Person's First Name"
            label="First Name"
            required
            error={firstNameInputHasError && "First name must not be empty or contain more than 100 characters"}
            value={enteredFirstName}
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
        />

        <TextInput
            placeholder="Person's Last Name"
            label="Last Name"
            required
            error={lastNameInputHasError && "Last name must not be empty or contain more than 300 characters"}
            value={enteredLastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
        />

        <DatePicker
            placeholder="Pick date" 
            label="Event date" 
            value={enteredDate}
            onChange={(newValue) => {setenteredDate(newValue)}}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input, selected: styles.selected}}
        />

        <Divider className={styles.divider}/>
        
        <Select
            label="Contact type"
            required
            placeholder="Pick one"
            onChange={contactTypeChangedHandler}
            onBlur={contactTypeBlurHandler}
            data={[
                { value: 'Cellphone', label: 'Cellphone' },
                { value: 'Telephone', label: 'Telephone' },
                { value: 'Email', label: 'Email' },
                { value: 'Pager', label: 'Pager' },
            ]}
            error = {contactTypeInputHasError && "Select one option"}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input, selected: styles.selected}}
        />

        <TextInput
            placeholder="Person's Contact Number"
            label="Contact Number"
            required
            error={contactNumberInputHasError && "Contact number must not be empty"}
            value={enteredContactNumber}
            onChange={contactNumberChangedHandler}
            onBlur={contactNumberBlurHandler}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
        />
      <Button classNames={{ filled : styles.btn}} type="submit">Add Contact</Button>
    </form>
  )
}

export default ContactForm;