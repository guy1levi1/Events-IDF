import React from "react";
import Button from "@mui/material/Button";
import "./Login.css";
import { NavLink } from "react-router-dom";
import TryTextFieldRTL from "../../../utils/auth/TryTextFieldRTL";
import useForm from "../../../utils/hooks/useForm";
import { Box } from "@mui/material";

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
    <Box className="authWarraperLogin">
      <label className="loginLabelLogin">התחברות</label>
      <Box className="textsFieldsLogin">
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
      </Box>
      <Box className="authActionsLogin">
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
      </Box>
    </Box>
  );
}
