import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import "./AuthCard.css";

export default function AuthCard() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-Warraper">
      <label style={{marginBottom: '15px', marginTop: '15px'}}>התחברות</label>
      <TextField
        error={false}
    
        sx={{ width: "60%", my: "20px"}}
        id="outlined-error-helper-text"
        label="מ'ס אישי"
        helperText="מ'ס אישי בעל 9 ספרות"
      />

      <TextField
        
        error={false}
        sx={{ width: "60%", mb:"30"}}
        id="outlined-error-helper-text"
        label="סיסמא"
        helperText="מינימום 6 ספרות"
        type={showPassword ? "text" : "password"}
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

      <Button variant="contained" color="primary" sx={{mt: '30px', mb: "15px"}}>התחבר/י</Button>
    </div>
  );
}
