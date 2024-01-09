import { useCallback, useState } from "react";
import {
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

  const validateInput = useCallback(
    (inputId, value) => {
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
          return value.length !== 0;
        case "eventName":
          return (
            VALIDATOR_MAXLENGTH(value, 50) && VALIDATOR_MINLENGTH(value, 1)
          );
        case "eventDate":
          return VALIDATOR_DATE_EVENT(value);
        case "eventLocation":
          return (
            VALIDATOR_MAXLENGTH(value, 50) && VALIDATOR_MINLENGTH(value, 1)
          );
        case "description":
          return (
            VALIDATOR_MAXLENGTH(value, 1000) && VALIDATOR_MINLENGTH(value, 1)
          );
        default:
          return true;
      }
    },
    [formData]
  );

  const handleInput = (e) => {
    let newValue;
    let inputId;
    // console.log(e);
    if (e.type === "update") {
      // console.log("value: " + e.value + " id: " + e.id);
      inputId = e.id;
      newValue = e.value;
    } else if (e.$d) {
      // console.log("eventDatevalue: " + e.$d + " id:  eventDate");
      newValue = e.$d;
      inputId = "eventDate";
    } else if (e.id === "commandsSelector") {
      // console.log("commandsSelector value: " + e.value + " id: " + e.id);
      inputId = e.id;
      newValue = e.value;
    } else {
      // console.log("in case of inut change value: " + e.target.value);
      newValue = e.target.value;
      inputId = e.target.id || e.target.name;
    }

    // Validate the input using the validation functions
    const isValidAfterChange = validateInput(inputId, newValue);

    // console.log("isValidAfterChange " + inputId + ": " + isValidAfterChange);

    const keyArray = Object.keys(formData.initialInputs);

    // console.log("keyArray: ");
    // console.log(keyArray);
    let hasError = false;

    keyArray.forEach((key) => {
      if (key === inputId) {
        hasError = !isValidAfterChange || hasError;
        // console.log("has error line 87 : " + hasError);
      } else {
        hasError = !formData.initialInputs[key].isValid || hasError;
        // console.log("has error line 89 : " + hasError + "key: " + key);
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

    // console.log(formData);
    // e.type === "update" && console.log(formData);
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
          value: value,
          isValid: isValidAfterChange,
          error: false,
        },
      },
      isValid: !hasError,
    }));
    // console.log(formData);
  };

  return { formData, handleInput, handleBlur, handelUpdateData };
}
