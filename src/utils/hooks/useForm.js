import { useState } from "react";
import {
  VALIDATOR_FULLNAME,
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
      default:
        return false;
    }
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    const inputId = e.target.id;
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

  // const formIsValid = useCallback((formData) => {
  //   const keyArray = Object.keys(formData);
  //   let hasError = false;
  //   keyArray.forEach((key) => {
  //     hasError = !formData[key].isValid;
  //   });
  //   return !hasError;
  // }, []);

  return { formData, handleInput, handleBlur };
}
