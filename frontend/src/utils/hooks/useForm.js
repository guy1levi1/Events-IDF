import { useState } from "react";
import {
  VALIDATOR_COMMAND,
  VALIDATOR_DATE_EVENT,
  VALIDATOR_FULLNAME,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_PRIVATE_NUMBER,
} from "../validators";

export default function useForm(initialInputs, isValid) {
  const [formData, setFormData] = useState({
    initialInputs: initialInputs,
    isValid: isValid,
  });

  const validateInput = (inputId, value) => {
    switch (inputId) {
      case "privateNumber":
        return VALIDATOR_PRIVATE_NUMBER(value);
      case "password":
        return VALIDATOR_PASSWORD(value);
      case "fullName":
        return VALIDATOR_FULLNAME(value);
      case "secPassword":
        return value === formData.initialInputs["password"].value;
      case "commandsSelector":
        return VALIDATOR_COMMAND(value);
      case "eventName":
        return VALIDATOR_MAXLENGTH(value, 50) && VALIDATOR_MINLENGTH(value, 1);
      case "eventDate":
        return VALIDATOR_DATE_EVENT(value);
      case "eventLocation":
        return VALIDATOR_MAXLENGTH(value, 50) && VALIDATOR_MINLENGTH(value, 1);
      case "description":
        return (
          VALIDATOR_MAXLENGTH(value, 1000) && VALIDATOR_MINLENGTH(value, 1)
        );
      default:
        return true;
    }
  };

  const handleInput = (e) => {
    let newValue;
    let inputId;
    if (e.$d) {
      newValue = e.$d;
      inputId = "eventDate";
    } else {
      newValue = e.target.value;
      inputId = e.target.id || e.target.name;
    }

    // Validate the input using the validation functions

    const isValidAfterChange = validateInput(inputId, newValue);

    const keyArray = Object.keys(formData.initialInputs);
    let hasError = false;

    keyArray.forEach((key) => {
      if (key === inputId) {
        hasError = !isValidAfterChange || hasError;
      } else {
        hasError = !formData.initialInputs[key].isValid || hasError;
      }
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      initialInputs: {
        ...prevFormData.initialInputs,
        [inputId]: {
          value: newValue,
          isValid: isValidAfterChange,
          error: false,
        },
      },
      isValid: !hasError,
    }));
  };

  const handleBlur = (inputId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      initialInputs: {
        ...prevFormData.initialInputs,
        [inputId]: {
          ...prevFormData.initialInputs[inputId],
          error: !prevFormData.initialInputs[inputId].isValid,
        },
      },
    }));
  };

  const handelUpdateData = (value, inputId) => {
    const isValidAfterChange = validateInput(inputId, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      initialInputs: {
        ...prevFormData.initialInputs,
        [inputId]: {
          value: value,
          isValid: isValidAfterChange,
          error: false,
        },
      },
    }));
  };

  return { formData, handleInput, handleBlur, handelUpdateData };
}
