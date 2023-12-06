import React from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";

export default function Login() {
  return (
    <div className="authWarraper">
      <label className="loginLabel">התחברות</label>
      <div className="textsFields">
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="מס' אישי"
          helperText="בעל 9 ספרות"
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="outlined-error-helper-text"
          error={false}
          labelTextField="סיסמא"
          helperText="מינימום 6 ספרות"
          typeofTextField="password"
        />
      </div>
      <div className="authActions">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "50px", mb: "5px", borderRadius: "5000px" }}
        >
          התחבר/י
        </Button>

        <NavLink className="linkToSignup" to="/signup">
          ליצירת חשבון חדש
        </NavLink>
      </div>
    </div>
  );
}
