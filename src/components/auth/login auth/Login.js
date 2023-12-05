import React from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { NavLink } from "react-router-dom";
import DesignedTextField from "../../../utils/auth/DesignedTextField";

export default function Login() {

  return (
    <div className="authWarraper">
      <label className="loginLabel">התחברות</label>
      <div className="textsFields">
        <DesignedTextField
          error={false}
          labelTextField="מ'ס אישי"
          helperText="בעל 9 ספרות"
          isPassword={false}
        />
        <DesignedTextField
          error={false}
          labelTextField="סיסמא"
          helperText="מינימום 6 ספרות"
          isPassword={true}
        />
      </div>
      <div className="authActions">
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: "50px", mb: "5px", borderRadius: "5000px"}}
        >
          התחבר/י
        </Button>
        <NavLink className="linkToSignup">ליצירת חשבון חדש</NavLink>
      </div>
    </div>
  );
}
