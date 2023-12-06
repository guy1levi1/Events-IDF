import React from "react";
import { CssBaseline, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export default function TryTextFieldRTL({
  id,
  error,
  labelTextField,
  helperText,
  typeofTextField,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div dir="rtl">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TextField
            error={error}
            size="small"
            sx={{
              width: "20rem",
              mb: "0.3rem",

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
            }}
            id={id}
            select={typeofTextField === "select"}
            label={labelTextField}
            helperText={helperText}
            type={
              typeofTextField === "password" && !showPassword
                ? "password"
                : "text"
            }
            InputProps={
              typeofTextField === "password" && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
          >
            {props.children}
          </TextField>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
