import React, { useState , useContext } from 'react';
import styles from '../scss/components/contactForm.module.scss'
import useInput from '../hooks/useInput';
import { TextInput, Divider, Select, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Contact } from '../models/models';
import AuthContext from '../store/authContext';

const ContactForm : React.FC<{upload : (data:Contact)=>{}, isLoading: boolean, contact?: Contact}> = (props) => {
    const authCtx = useContext(AuthContext);
    const author = authCtx.id;
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandlerText: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput(value => value.trim().length < 100 && value.trim() !== '', props.contact?.firstName);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandlerText: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput(value => value.trim().length < 300 && value.trim() !== '',props.contact?.lastName);

    const {
        value: enteredContactNumber,
        isValid: enteredContactNumberIsValid,
        hasError: contactNumberInputHasError,
        valueChangeHandlerText: contactNumberChangedHandler,
        inputBlurHandler: contactNumberBlurHandler,
        reset: resetContactNumberInput
    } = useInput(value => value.trim() !== '', props.contact?.contactNumber);

    const {
        value: enteredContactType,
        isValid: enteredContactTypeIsValid,
        hasError: contactTypeInputHasError,
        valueChangeHandlerSelect: contactTypeChangedHandler,
        inputBlurHandler: contactTypeBlurHandler,
        reset: resetContactTypeInput
    } = useInput(value => value.trim() !== '', props.contact?.contactType);

    const [enteredDate, setenteredDate] = useState<Date | null>(props.contact?.date ? props.contact.date : null);
    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid) {
        formIsValid = true;
    }

    console.log(enteredDate);
    console.log(enteredContactType)

    const formSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault(); 
        firstNameBlurHandler();
        lastNameBlurHandler();
        contactNumberBlurHandler();
        contactTypeBlurHandler();
    
        if (!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredContactNumberIsValid || !enteredContactTypeIsValid ) {
          return;
        }
       
        props.upload({firstName: enteredFirstName, lastName: enteredLastName, date: enteredDate, isFavorite: false, contactType: enteredContactType, contactNumber: enteredContactNumber, author : author})
        
    
        resetFirstNameInput();
        resetLastNameInput();
        resetContactNumberInput();
        resetContactTypeInput();
    
      };

    

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}> 
        <TextInput
            placeholder="Person's First Name"
            label="First Name"
            required
            disabled={props.isLoading}
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
            disabled={props.isLoading}
            error={lastNameInputHasError && "Last name must not be empty or contain more than 300 characters"}
            value={enteredLastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
        />

        <DatePicker
            placeholder={enteredDate ? new Date(enteredDate).toLocaleDateString("en-EN", {day: '2-digit', month: 'long' , year: 'numeric'}) : "Pick date" }
            label="Event date" 
            disabled={props.isLoading}
            value={enteredDate}
            clearable
            onChange={(newValue) => {setenteredDate(newValue)}}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input, selected: styles.selected}}
        />

        <Divider className={styles.divider}/>
        
        <Select
            label="Contact type"
            required
            disabled={props.isLoading}
            placeholder={enteredContactType ? enteredContactType : "Pick one"}
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
            disabled={props.isLoading}
            error={contactNumberInputHasError && "Contact number must not be empty"}
            value={enteredContactNumber}
            onChange={contactNumberChangedHandler}
            onBlur={contactNumberBlurHandler}
            classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
        />
      <Button loading={props.isLoading} classNames={{ filled : styles.btn}} type="submit">{props.contact ? "Edit Contact" : "Add Contact"}</Button>
    </form>
  )
}

export default ContactForm;