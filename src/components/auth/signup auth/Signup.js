import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Signup.css";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@mui/material";
import useForm from "../../../utils/hooks/useForm";
import { Box, TextField } from "@mui/material";
import InputsWrapper from "../../../utils/InputsWrapper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

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
  commandsSelector: {
    value: "",
    isValid: false,
    error: false,
  },
};

export default function Signup() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecPassword, setShowSecPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleSecPasswordVisibility = () => {
    setShowSecPassword(!showSecPassword);
  };

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  return (
    <Box className="authWarraperSignup">
      <label className="SignupLabel">הרשמה</label>
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
          id="fullName"
          size="small"
          sx={{
            width: "20rem",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: !formData.initialInputs.fullName.error
                ? "#8EAEDE"
                : "#d9d9d9",
            },
            "& .MuiInputLabel-root": {
              color: !formData.initialInputs.fullName.error
                ? "white !important"
                : "red !important",
              backgroundColor: !formData.initialInputs.fullName.error
                ? "#8EAEDE"
                : "#d9d9d9",
              borderRadius: "500px",
              px: 1,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.fullName.error
                ? "white !important"
                : "red !important",
            },
          }}
          required={true}
          error={formData.initialInputs.fullName.error}
          value={formData.initialInputs.fullName.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          label="שם מלא"
          helperText={
            !formData.initialInputs.fullName.error
              ? "הכנס שם מלא בעברית"
              : "שם מלא לא תקין"
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
        <TextField
          id="secPassword"
          size="small"
          sx={{
            width: "20rem",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: !formData.initialInputs.secPassword.error
                ? "#8EAEDE"
                : "#d9d9d9",
            },
            "& .MuiInputLabel-root": {
              color: !formData.initialInputs.secPassword.error
                ? "white !important"
                : "red !important",
              backgroundColor: !formData.initialInputs.secPassword.error
                ? "#8EAEDE"
                : "#d9d9d9",
              borderRadius: "500px",
              px: 1,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.secPassword.error
                ? "white !important"
                : "red !important",
            },
          }}
          required={true}
          error={formData.initialInputs.secPassword.error}
          value={formData.initialInputs.secPassword.value}
          onChange={handleInputChange}
          onBlur={handleBlurChange}
          label="אימות סיסמא"
          helperText={
            !formData.initialInputs.secPassword.error
              ? "הזן שנית את הסיסמא"
              : "הסיסמאות אינן זהות"
          }
          type={!showSecPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleSecPasswordVisibility}>
                  {showSecPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-select-currency"
          name="commandsSelector"
          size="small"
          sx={{
            width: "20rem",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: "#8EAEDE",
            },
            "& .MuiInputLabel-root": {
              color: "white !important",
              backgroundColor: "#8EAEDE",
              borderRadius: "500px",
              px: 1,
            },

            "& .MuiOutlinedInput-input": {
              color: "white !important",
            },
          }}
          required={true}
          // error={formData.initialInputs.commandsSelector.error}
          value={formData.initialInputs.commandsSelector.value}
          label="פיקוד"
          helperText="בחר פיקוד"
          select={true}
          onChange={handleInputChange}
          // onBlur={handleBlurChange}
        >
          {commands.map(
            (option) =>
              option.commandId !== 0 && (
                <MenuItem key={option.commandId} value={option.commandName}>
                  {option.commandName}
                </MenuItem>
              )
          )}
        </TextField>
      </InputsWrapper>

      <div className="authActionsSignup">
        <Link
          to={!formData.isValid ? "/signup" : "/manageEventes"} // of course we have to check if input is valid
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
            sx={{ mt: "50px", mb: "5px", borderRadius: "500px" }}
          >
            הירשם/י
          </Button>
        </Link>
        <NavLink className="linkToLogin" to="/login">
          להתחברות עם משתמש קיים
        </NavLink>
      </div>
    </Box>
  );
}
