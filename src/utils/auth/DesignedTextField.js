import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function DesignedTextField({
  error,
  labelTextField,
  helperText,
  isPassword,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <>
      <TextField
        error={error}
        size="small"
        sx={{
          width: "100%",
          mb: "1rem",

          "& .MuiInputBase-root": {
            color: "white !important",
            borderRadius: "5000px",
            backgroundColor: "#6290D4",
          },
          "& .MuiInputLabel-root": {
            color: "white !important",
            backgroundColor: "#6290D4",
            borderRadius: "500px",
            px: 1,
          },

          "& .MuiOutlinedInput-input": {
            color: "white !important",
          },
          "& .MuiFormHelperText-root": {
            textAlign: "right",
          },

        }}
        id="outlined-error-helper-text"
        label={labelTextField}
        helperText={helperText}
        type={isPassword && showPassword ? "text" : "password"}
        InputProps={
          isPassword && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </>
  );
}
