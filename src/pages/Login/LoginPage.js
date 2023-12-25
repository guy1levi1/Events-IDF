import React from "react";
import Button from "@mui/material/Button";
import "./LoginPage.css";
import { NavLink } from "react-router-dom";
import useForm from "../../utils/hooks/useForm";
import { Box, TextField } from "@mui/material";
import InputsWrapper from "../../utils/InputsWrapper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

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
export default function LoginPage() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  return (
    <Box className="authWarraperLogin">
      <label className="loginLabelLogin">התחברות</label>
      <InputsWrapper className="textsFieldsLogin">
        <TextField
          id="privateNumber"
          size="small"
          sx={{
            width: "20rem",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: !formData.initialInputs.privateNumber.error
                ? "#8EAEDE"
                : "#d9d9d9",
            },
            "& .MuiInputLabel-root": {
              color: !formData.initialInputs.privateNumber.error
                ? "white !important"
                : "red !important",
              backgroundColor: !formData.initialInputs.privateNumber.error
                ? "#8EAEDE"
                : "#d9d9d9",
              borderRadius: "500px",
              px: 1,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.privateNumber.error
                ? "white !important"
                : "red !important",
            },
          }}
          required={true}
          error={formData.initialInputs.privateNumber.error}
          value={formData.initialInputs.privateNumber.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          label="מס' אישי"
          helperText={
            !formData.initialInputs.privateNumber.error
              ? "בעל 7 ספרות"
              : "הכנס 7 ספרות בלבד"
          }
          
        />
        <TextField
          id="password"
          size="small"
          sx={{
            width: "20rem",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: !formData.initialInputs.password.error
                ? "#8EAEDE"
                : "#d9d9d9",
            },
            "& .MuiInputLabel-root": {
              color: !formData.initialInputs.password.error
                ? "white !important"
                : "red !important",
              backgroundColor: !formData.initialInputs.password.error
                ? "#8EAEDE"
                : "#d9d9d9",
              borderRadius: "500px",
              px: 1,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.password.error
                ? "white !important"
                : "red !important",
            },
          }}
          required={true}
          error={formData.initialInputs.password.error}
          value={formData.initialInputs.password.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          label="סיסמא"
          helperText={
            !formData.initialInputs.password.error
              ? "סיסמא עם מינימום 6 תווים, אותיות באנגלית וספרות בלבד"
              : "סיסמא לא תקינה"
          }
          type={!showPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </InputsWrapper>
      <Box className="authActionsLogin">
        <Link
          to={!formData.isValid ? "/login" : "/manageEventes"} // of course we have to check if user exists and password is correct
          style={{ color: "white", textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
            sx={{ mt: "50px", mb: "5px", borderRadius: "5000px" }}
          >
            התחבר/י
          </Button>
        </Link>
        <NavLink className="linkToSignup" to="/signup">
          ליצירת חשבון חדש
        </NavLink>
      </Box>
    </Box>
  );
}
