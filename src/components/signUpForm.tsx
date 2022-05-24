import React, { useState } from 'react'
import styles from '../scss/components/loginForm.module.scss'
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, PasswordInput } from '@mantine/core';

const SignUpForm : React.FC<{isSignIn : (value:boolean)=>void, submitHandler: (username:string,password:string)=>void, isLoading : boolean}> = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredUsernameErrorisVisible, setEnteredUsernameErrorisVisible] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredPasswordErrorisVisible, setEnteredPasswordErrorisVisible] = useState(false);
    const navigate = useNavigate();


    const usernameValidator = (username : string): boolean => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
            return true
        }
        else {
            return false
        }
    };

    const passwordValidator = (password : string) : boolean => {
        if(/(?=.*[+!#$-])(?=.*\d)(?=.{6}).*/.test(password)) {
            return true
        }
        else {
            return false
        }
    };

    const formSubmitHandler = (event: React.FormEvent) : void => {
        event.preventDefault();
        const enteredUsernameIsValid = usernameValidator(enteredUsername.trim());
        if (!enteredUsernameIsValid) {
            setEnteredUsernameErrorisVisible(true);
            setEnteredUsername("");
        }

        const enteredPasswordIsValid = passwordValidator(enteredPassword.trim());
        if (!enteredPasswordIsValid) {
            setEnteredPasswordErrorisVisible(true);
            setEnteredPassword("");
        }



       if(!enteredUsernameIsValid || !enteredPasswordIsValid) {
            return;
        }


        props.submitHandler(enteredUsername,enteredPassword);


    };

    return (
        <form onSubmit={formSubmitHandler} className={styles.form}>

            <TextInput
                placeholder="Your Username"
                label="Username"
                required
                disabled={props.isLoading}
                error={enteredUsernameErrorisVisible && "Username must be a valid email form"}
                onFocus={() => setEnteredUsernameErrorisVisible(false)}
                value={enteredUsername}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setEnteredUsername(e.target.value)}}
                classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
            />

            <PasswordInput
                placeholder="Your Password"
                label="Password"
                description='Password must be longer than 6 characters, contain atleast one number and "+,!,#,$,-" character'
                required
                disabled={props.isLoading}
                error={enteredPasswordErrorisVisible && 'Invalid password format'}
                onFocus={() => setEnteredPasswordErrorisVisible(false)}
                value={enteredPassword}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setEnteredPassword(e.target.value)}}
                classNames={{root : styles.inputWrapper,defaultVariant : styles.input}}
            />

            <Button classNames={{ filled : styles.btn}} loading={props.isLoading} type="submit">Sign up</Button>
            <div className={styles.bottomWrapper}>
            <p>Already have an account?</p><a onClick={()=>props.isSignIn(true)}>Sign in</a>
            </div>
            
        </form>
    )
}

export default SignUpForm;