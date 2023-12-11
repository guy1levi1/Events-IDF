import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";
import { MenuItem } from "@mui/material";
import useForm from "../../../utils/hooks/useForm";

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

const formStates = {
  privateNumber: {
    value: "",
    isValid: false,
    error: false,
  },
  fullName: {
    value: "",
    isValid: false,
    error: false,
  },
  password: {
    value: "",
    isValid: false,
    error: false,
  },
  secPassword: {
    value: "",
    isValid: false,
    error: false,
  },
};

export default function Signup() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);

  const [selectedCommand, setSelectedCommand] = useState(
    commands[0].commandName
  );

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  const handleSelctedCommand = (e) => {
    setSelectedCommand((prevSelectedCommand) => e.target.value);
  };

  return (
    <div className="authWarraperSignup">
      <label className="SignupLabel">הרשמה</label>
      <div className="textsFieldsSignup">
        <TryTextFieldRTL
          id="privateNumber"
          required={true}
          error={formData.initialInputs.privateNumber.error}
          value={formData.initialInputs.privateNumber.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          labelTextField="מס' אישי"
          helperText={
            !formData.initialInputs.privateNumber.error
              ? "בעל 7 ספרות"
              : "הכנס 7 ספרות בלבד"
          }
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="fullName"
          required={true}
          error={formData.initialInputs.fullName.error}
          value={formData.initialInputs.fullName.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          labelTextField="שם מלא"
          helperText={
            !formData.initialInputs.fullName.error
              ? " שדה חובה"
              : "מקסימום 50 תווים"
          }
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="password"
          required={true}
          error={formData.initialInputs.password.error}
          value={formData.initialInputs.password.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          labelTextField="סיסמא"
          helperText={
            !formData.initialInputs.password.error
              ? "סיסמא עם מינימום 6 תווים, אותיות באנגלית וספרות בלבד"
              : "סיסמא לא תקינה"
          }
          typeofTextField="password"
        />
        <TryTextFieldRTL
          id="secPassword"
          required={true}
          error={formData.initialInputs.secPassword.error}
          value={formData.initialInputs.secPassword.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          labelTextField="אימות סיסמא"
          helperText={
            !formData.initialInputs.secPassword.error
              ? "הזן שנית את הסיסמא"
              : "הסיסמאות אינן לא זהות"
          }
          typeofTextField="password"
        />
        <TryTextFieldRTL
          id="outlined-select-currency"
          required={true}
          error={false}
          labelTextField="פיקוד"
          helperText="בחר פיקוד"
          typeofTextField="select"
          value={selectedCommand}
          onChange={handleSelctedCommand}
        >
          {commands.map((option) => (
            <MenuItem key={option.commandId} value={option.commandName}>
              {option.commandName}
            </MenuItem>
          ))}
        </TryTextFieldRTL>
      </div>
      <div className="authActionsSignup">
        <Button
          variant="contained"
          color="primary"
          disabled={!formData.isValid}
          sx={{ mt: "50px", mb: "5px", borderRadius: "500px" }}
        >
          הירשם/י
        </Button>
        <NavLink className="linkToLogin" to="/login">
          להתחברות עם משתמש קיים
        </NavLink>
      </div>
    </div>
  );
}
