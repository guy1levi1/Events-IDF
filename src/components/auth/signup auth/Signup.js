import React from "react";
import Button from "@mui/material/Button";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";
import { MenuItem } from "@mui/material";

const commands = [
  {
    commandId: 1,
    commandName: "פיקוד מרכז"
  },
  {
    commandId: 2,
    commandName: "פיקוד צפון"
  },
  {
    commandId: 3,
    commandName: "פיקוד דרום"
  }

]

export default function Signup() {
  return (
    <div className="authWarraperSignup">
      <label className="SignupLabel">הרשמה</label>
      <div className="textsFieldsSignup">
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="מ'ס אישי"
          helperText="בעל 9 ספרות"
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="שם מלא"
          helperText="שדה חובה"
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="סיסמא"
          helperText="מינימום 6 ספרות"
          typeofTextField="password"
        />
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="וידוא סיסמא"
          helperText="הכנס סיסמא זהה"
          typeofTextField="password"
        />
        <TryTextFieldRTL
          id="outlined-select-currency"
          error={false}
          labelTextField="פיקוד"
          helperText="בחר פיקוד"
          typeofTextField="select"
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
          sx={{ mt: "50px", mb: "5px", borderRadius: "500px" }}
        >
          התחבר/י
        </Button>
        <NavLink className="linkToLogin">להתחברות עם משתמש קיים</NavLink>
      </div>
    </div>
  );
}
