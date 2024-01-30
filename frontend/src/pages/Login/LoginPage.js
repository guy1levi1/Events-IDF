import React, { useContext, useEffect, useState } from "react";
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
import { post } from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../utils/contexts/authContext";

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
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const vh = window.innerHeight;
        const pixelValue = (vh * 0.06).toFixed(2);
        setVhAsPixels(pixelValue);

        const initialFontSizeValue = (vh * 0.026).toFixed(2);
        setInitialFontSize(initialFontSizeValue);
      }
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleLogin = async () => {
    const apiUrl = "http://localhost:5000/api/users/login";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
    };

    const body = {
      privateNumber: formData.initialInputs.privateNumber.value,
      password: formData.initialInputs.password.value,
    };

    try {
      const response = await post(apiUrl, body, headers);
      auth.login(response.data.userId, response.data.token);
      navigate("/manageEvents");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "התחברות נכשלה",
        text: error.massage,
        icon: "error",
        confirmButtonText: "בוצע",
      }).then(() => {});
    }
  };

  return (
    <Box className="authWarraperLogin">
      <label className="loginLabelLogin">התחברות</label>
      <InputsWrapper className="textsFieldsLogin">
        <TextField
          id="privateNumber"
          size="small"
          sx={{
            width: "85%",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              height: `${vhAsPixels}px`,
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
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
            },
            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.privateNumber.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
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
            width: "85%",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              height: `${vhAsPixels}px`,
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
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.password.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
            },
            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
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
              ? "הכנס סיסמא מתאימה"
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
      <Box
        className="authActionsLogin"
        sx={{ height: `${vhAsPixels * 1.35}px` }}
      >
        <Box
          sx={{
            width: "28%",
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            sx={{
              borderRadius: "5000px",
              fontSize: [
                "0.2rem",
                "0.4rem",
                +"0.7rem",
                "1rem",
                "1.3rem",
                "1.6rem",
                "1.9rem",
              ],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            התחבר/י
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLink
            className="linkToSignup"
            to="/signup"
            style={{
              fontSize: ["small", "medium", "large", "large", "x-large"],
            }}
          >
            ליצירת חשבון חדש
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
