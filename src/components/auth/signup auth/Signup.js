import React from "react";
import Button from "@mui/material/Button";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import DesignedTextField from "../../../utils/auth/DesignedTextField";

export default function Signup() {
  return (
    <div className="authWarraperSignup">
      <label className="SignupLabel">הרשמה</label>
      <div className="textsFieldsSignup">
        <DesignedTextField
          error={false}
          labelTextField="מ'ס אישי"
          helperText="בעל 9 ספרות"
          isPassword={false}
        />
        <DesignedTextField
          error={false}
          labelTextField="שם מלא"
          helperText="שדה חובה"
          isPassword={false}
        />
        <DesignedTextField
          error={false}
          labelTextField="סיסמא"
          helperText="מינימום 6 ספרות"
          isPassword={true}
        />
        <DesignedTextField
          error={false}
          labelTextField="וידוא סיסמא"
          helperText="הכנס סיסמא זהה"
          isPassword={true}
        />
      </div>
      <div className="authActionsSignup">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "50px", mb: "5px" }}
        >
          התחבר/י
        </Button>
        <NavLink className="linkToLogin">להתחברות עם משתמש קיים</NavLink>
      </div>
    </div>
  );
}
