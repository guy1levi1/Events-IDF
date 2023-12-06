import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";

export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    privateNumber: { value: "", isValid: false, error: false },
    password: { value: "", isValid: false, error: false },
  });

  const handlePrivateNumberChange = (e) => {
    const newPrivateNumber = e.target.value;
    setLoginFormData({
      ...loginFormData,
      privateNumber: {
        value: newPrivateNumber,
        isValid: newPrivateNumber.length === 9,
        error: false // Reset error when the user types
      },
    });
  };

  const handlePrivateNumberBlur = () => {
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      privateNumber: {
        ...prevFormData.privateNumber,
        error: !prevFormData.privateNumber.isValid,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setLoginFormData({
      ...loginFormData,
      password: {
        value: newPassword,
        isValid: newPassword.length >= 6,
        error: false, // Reset error when the user types
      },
    });
  };

  const handlePasswordBlur = () => {
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      password: {
        ...prevFormData.password,
        error: !prevFormData.password.isValid,
      },
    }));
  };

  return (
    <div className="authWarraper">
      <label className="loginLabel">התחברות</label>
      <div className="textsFields">
        <TryTextFieldRTL
          id="private-number"
          error={loginFormData.privateNumber.error}
          value={loginFormData.privateNumber.value}
          onChange={handlePrivateNumberChange}
          onBlur={handlePrivateNumberBlur}
          labelTextField="מס' אישי"
          helperText={!loginFormData.privateNumber.error ? "בעל 9 ספרות" : "הכנס תשע ספרות בלבד"}
          typeofTextField="regular"
        />
        <TryTextFieldRTL
          id="password"
          error={loginFormData.password.error}
          value={loginFormData.password.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          labelTextField="סיסמא"
          helperText={!loginFormData.password.error? "מינימום 6 ספרות": "הכנס סיסמא בעלת 6 ומעלה"}
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
