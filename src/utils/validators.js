export const VALIDATOR_MINLENGTH = (data, val) => {
  return data.trim().length >= val;
};
export const VALIDATOR_MAXLENGTH = (data, val) => {
  return data.trim().length <= val;
};

export const VALIDATOR_EXACLENGTH = (data, val) => {
  return data.trim().length === val;
};
