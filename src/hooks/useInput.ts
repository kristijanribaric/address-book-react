import React, { useState } from 'react';

const useInput = (validateValue: (value :string)=> {}, initialValue? : string) => {
  const [enteredValue, setEnteredValue] = useState(initialValue ? initialValue : '');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandlerText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const valueChangeHandlerSelect = (value: string) => {
    setEnteredValue(value);
  };




  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandlerText,
    valueChangeHandlerSelect,
    inputBlurHandler,
    reset
  };
};

export default useInput;