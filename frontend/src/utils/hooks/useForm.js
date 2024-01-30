import { useCallback, useEffect, useState } from "react";
import {
  VALIDATE_PASSWORD_AND_SEC_PASSWORD,
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
        case "passwordLogin":
          return true;
        case "password":
          const ans = VALIDATE_PASSWORD_AND_SEC_PASSWORD(
            value,
            formData.initialInputs["secPassword"].value
          );
          // if (ans.secPassword) {
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     initialInputs: {
          //       ...prevFormData.initialInputs,
          //       secPassword: {
          //         ...prevFormData.initialInputs.secPassword,
          //         error: false,
          //         isValid: true,
          //       },
          //     },
          //   }));
          // } else {
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     initialInputs: {
          //       ...prevFormData.initialInputs,
          //       secPassword: {
          //         ...prevFormData.initialInputs.secPassword,
          //         error: true,
          //         isValid: false,
          //       },
          //     },
          //   }));
          // }

          return ans.password;
        case "fullName":
          return VALIDATOR_FULLNAME(value);
        case "secPassword":
          const ansSec = VALIDATE_PASSWORD_AND_SEC_PASSWORD(
            formData.initialInputs["password"].value,
            value
          );
          // if (ansSec.password) {
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     initialInputs: {
          //       ...prevFormData.initialInputs,
          //       password: {
          //         ...prevFormData.initialInputs.password,
          //         error: false,
          //         isValid: true,
          //       },
          //     },
          //   }));
          // } else {
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     initialInputs: {
          //       ...prevFormData.initialInputs,
          //       password: {
          //         ...prevFormData.initialInputs.password,
          //         error: true,
          //         isValid: false,
          //       },
          //     },
          //   }));
          // }
          return ansSec.secPassword;
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
    if (e.type === "update") {
      inputId = e.id;
      newValue = e.value;
    } else if (e.$d) {
      newValue = e.$d;
      inputId = "eventDate";
    } else if (e.id === "commandsSelector") {
      inputId = e.id;
      newValue = e.value;
    } else {
      newValue = e.target.value;
      inputId = e.target.id || e.target.name;
    }
    // let secValueIsValidAfterChange = "";
    let secInputId = "";

    const isValidAfterChange = validateInput(inputId, newValue);
    console.log(newValue);
    console.log(inputId);
    console.log(isValidAfterChange);
    // Validate the input using the validation functions
    // if (inputId === "password") {
    //   secValueIsValidAfterChange = validateInput(
    //     "secPassword",
    //     formData.initialInputs["secPassword"].value
    //   );
    //   console.log(secValueIsValidAfterChange);

    //   secInputId = "secPassword";
    // } else if (inputId === "secPassword") {
    //   secValueIsValidAfterChange = validateInput(
    //     "password",
    //     formData.initialInputs["password"].value
    //   );
    //   console.log(secValueIsValidAfterChange);

    //   secInputId = "password";
    // } else {
    //   secInputId = "";
    //   secValueIsValidAfterChange = "";
    //   console.log(secValueIsValidAfterChange)

    // }

    const keyArray = Object.keys(formData.initialInputs);

    let hasError = false;

    keyArray.forEach((key) => {
      // if (secInputId === "password" || secInputId === "secPassword") {
      //   console.log(
      //     "secInputId: " +
      //       secInputId +
      //       " secInputIsValid: " +
      //       secValueIsValidAfterChange +
      //       " firstInputIsValid: " +
      //       isValidAfterChange
      //   );

      //   hasError = !secValueIsValidAfterChange || hasError;
      // }
      if (key === inputId) {
        hasError = !isValidAfterChange || hasError;
      } else {
        hasError = !formData.initialInputs[key].isValid || hasError;
      }
    });
    console.log("has error: " + hasError);

    if (secInputId === "") {
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
    }
    //  else {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     initialInputs: {
    //       ...prevFormData.initialInputs,
    //       [inputId]: {
    //         value: newValue,
    //         isValid: isValidAfterChange,
    //         error: false,
    //       },
    //       [secInputId]: {
    //         ...prevFormData.initialInputs[secInputId],
    //         isValid: secValueIsValidAfterChange,
    //         error: !secValueIsValidAfterChange,
    //       },
    //     },
    //     isValid: !hasError,
    //   }));
    // }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
  };

  return { formData, handleInput, handleBlur, handelUpdateData };
}
