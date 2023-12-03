import React from "react";
import TextField from '@mui/material/TextField';
import "./AuthCard.css";

export default function AuthCard() {
  return (
    <div className="auth-Warraper">
      <div className="auth-card">
        <TextField
          error={false}
          id="outlined-error-helper-text"
          label="מ'ס אישי"
          helperText="מ'ס אישי בעל 9 ספרות"
        />
      </div>
    </div>
  );
}
