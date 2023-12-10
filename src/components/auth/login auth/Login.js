import React from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";
import useForm from "../../../utils/hooks/useForm";

const formStates = {
  privateNumber: {
    value: "",
    isValid: false,
    error: false,
  },
  password: {
    value: "",
    isValid: false,
    error: false,
  },
};

export default function Login() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };



  return (
    <div className="authWarraper">
      <label className="loginLabel">התחברות</label>
      <div className="textsFields">
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
              ? "בעל 9 ספרות"
              : "הכנס 9 ספרות בלבד"
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
              ? "מינימום 6 ספרות"
              : "הכנס סיסמא בעלת 6 ומעלה"
          }
          typeofTextField="password"
        />
      </div>
      <div className="authActions">
        <Button
          variant="contained"
          color="primary"
          disabled={!formData.isValid}
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
