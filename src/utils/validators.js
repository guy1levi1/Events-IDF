export const VALIDATOR_MINLENGTH = (data, lng) => {
  return data.trim().length >= lng;
};
export const VALIDATOR_MAXLENGTH = (data, lng) => {
  return data.trim().length <= lng;
};

export const VALIDATOR_EXACLENGTH = (data, lng) => {
  return data.trim().length === lng;
};

export const VALIDATOR_PRIVATE_NUMBER = (value) => {
  return VALIDATOR_EXACLENGTH(value, 7) && !/\D/.test(value);
}

export const VALIDATOR_FULLNAME = (value) => {
  return VALIDATOR_MAXLENGTH(value, 50) && /^[א-ת']+(\s[א-ת']{1,}){1,2}$/.test(value);
}

export const VALIDATOR_PASSWORD = (value) => {
  return VALIDATOR_MINLENGTH(value, 6) && /^[^\sא-ת!@#$%^&*()_+={}4\]:;<>,.?/"'\\`|]*$/.test(value);
}