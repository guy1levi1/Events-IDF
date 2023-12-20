import { useState } from "react";
import {
  VALIDATOR_DATE_EVENT,
  VALIDATOR_FULLNAME,
  VALIDATOR_MAXLENGTH,
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
        return value !== "";
      case "eventName":
        return VALIDATOR_MAXLENGTH(value, 50);
      case "eventDate":
        return VALIDATOR_DATE_EVENT(value);
      case "eventLocation":
        return VALIDATOR_MAXLENGTH(value, 50);
      case "description":
        return VALIDATOR_MAXLENGTH(value, 1000);
      default:
        return true;
    }
  };

  const handleInput = (e) => {
    console.log(e.$d);
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

  return { formData, handleInput, handleBlur };
}
