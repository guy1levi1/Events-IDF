import dayjs from "dayjs";

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
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  return dayjs(value).format("MM/DD/YYYY, HH:mm") > formattedDate;
};

export const VALIDATOR_PASSWORD = (value) => {
  return (
    VALIDATOR_MINLENGTH(value, 6) &&
    /^[^\sא-ת!@#$%^&*()_+={}\]:;<>,.?/"'\\`|]*$/.test(value)
  );
};
