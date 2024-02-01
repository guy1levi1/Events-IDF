const commands = [
  {
    commandId: 0,
    commandName: "",
  },
  {
    commandId: 1,
    commandName: "מרכז",
  },
  {
    commandId: 2,
    commandName: "צפון",
  },
  {
    commandId: 3,
    commandName: "דרום",
  },
  {
    commandId: 4,
    commandName: `פקע"ר`,
  },
];

export const VALIDATOR_COMMAND = (data) => {
  return commands.some((command) => command.commandName === data);
};

export const VALIDATOR_MINLENGTH = (data, lng) => {
  return data.length >= lng;
};

export const VALIDATOR_MAXLENGTH = (data, lng) => {
  return data.length <= lng;
};

export const VALIDATOR_EXACLENGTH = (data, lng) => {
  return data.length === lng;
};

export const VALIDATOR_PRIVATE_NUMBER = (value) => {
  return VALIDATOR_EXACLENGTH(value, 7) && !/\D/.test(value);
};

export const VALIDATOR_FULLNAME = (value) => {
  return (
    VALIDATOR_MAXLENGTH(value, 50) && /^[א-ת']+(\s[א-ת']{1,}){1,2}$/.test(value)
  );
};

export const VALIDATOR_DATE_EVENT = (value) => {
  const inputDate = new Date(value);
  const currentDate = new Date();

  // Check if the input date is greater than the current date
  if (inputDate > currentDate) {
    console.log(`${value} is a valid future date`);
    return true;
  } else {
    console.log(`${value} is not a valid future date`);
    return false;
  }
};

export const VALIDATOR_PASSWORD = (value) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value);
};

export const VALIDATE_PASSWORD_AND_SEC_PASSWORD = (value, secValue) => {
  const passwordValidation = VALIDATOR_PASSWORD(value);
  const secPasswordValidation = VALIDATOR_PASSWORD(secValue);
  const areIdentical = value === secValue;
  // console.log("value1: " + value + " value2: " + secValue);
  // console.log(passwordValidation);
  // console.log(secPasswordValidation);
  // console.log(areIdentical);

  if (areIdentical && passwordValidation && secPasswordValidation) {
    // זהים ותקינים
    return { password: true, secPassword: true };
  } else if (areIdentical && !passwordValidation) {
    // זהים אך לא תקינים
    return { password: false, secPassword: false };
  } else if (!areIdentical && passwordValidation && !secPasswordValidation) {
    // לא זהים אימות סיסמא לא תקין
    return { password: true, secPassword: false };
  } else if (!areIdentical && secPasswordValidation && !passwordValidation) {
    // לא זהים סיסמא לא תקינה
    return { password: false, secPassword: false };
  } else if (!areIdentical && !secPasswordValidation && !passwordValidation) {
    // לא זהים שניהם לא תקינים
    return { password: false, secPassword: false };
  } else if (!areIdentical && secPasswordValidation && passwordValidation) {
    // לא זהים שניהם תקינים
    return { password: true, secPassword: false };
  }
};
