import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import useForm from "../../utils/hooks/useForm";
import { Box, TextField } from "@mui/material";
import InputsWrapper from "../../utils/InputsWrapper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { get, post } from "../../utils/api/api";
import Swal from "sweetalert2";
const { v4: uuidv4 } = require("uuid");

// const commands = [
//   {
//     commandId: 0,
//     commandName: "",
//   },
//   {
//     commandId: 1,
//     commandName: "מרכז",
//   },
//   {
//     commandId: 2,
//     commandName: "צפון",
//   },
//   {
//     commandId: 3,
//     commandName: "דרום",
//   },
//   {
//     commandId: 4,
//     commandName: `פקע"ר`,
//   },
// ];

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

export default function SignUpPage() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecPassword, setShowSecPassword] = useState(false);
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0);
  const [commands, setCommands] = useState([]);
  const navigate = useNavigate();

  const getCommands = async () => {
    const apiUrl = "http://localhost:5000/api/commands/";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
    };

    try {
      const response = await get(apiUrl, headers);
      console.log("Server response:", response.data);
      setCommands(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

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

    const fetchData = async () => {
      try {
        await getCommands();
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };

    const initializePage = async () => {
      handleResize();
      await fetchData();
    };

    initializePage();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const getCommandNameById = (commandName) => {
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].commandName === commandName) {
        return commands[i].id;
      }
      // If no matching commandName is found
    }
    return null;
  };

  const handleSignup = async () => {
    console.log(formData.initialInputs.privateNumber.value);
    console.log(formData.initialInputs.fullName.value);
    console.log(formData.initialInputs.password.value);
    console.log(formData.initialInputs.commandsSelector.value);
    console.log(
      getCommandNameById(formData.initialInputs.commandsSelector.value)
    );

    // Replace 'YOUR_SERVER_API_URL' with the actual URL of your signup endpoint
    const apiUrl =
      "http://localhost:5000/api/unapprovedUsers/signUpunapprovedUser";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
    };

    const body = {
      id: uuidv4(),
      privateNumber: formData.initialInputs.privateNumber.value,
      fullName: formData.initialInputs.fullName.value,
      password: formData.initialInputs.password.value,
      commandId: getCommandNameById(
        formData.initialInputs.commandsSelector.value
      ),
      isAdmin: false,
    };

    console.log(body);

    try {
      const response = await post(apiUrl, body, headers);
      console.log(response);
      console.log("Server response:", response.data);

      // annimation success
      Swal.fire({
        title: "נרשמת בהצלחה",
        text: "לאחר שענף סגל יאשר אותך תוכל להשתמש במערכת",
        icon: "success",
        // showCancelButton: true,
        // confirmButtonColor: "#",
        // cancelButtonColor: "#3085d6",
        confirmButtonText: "בוצע",
        // cancelButtonText: "בטל",
        // reverseButtons: true,
      }).then((result) => {
        navigate("/login");

        //
      });
    } catch (error) {
      // console.error("Error during signup:", error.response.da);
      console.log(error);
      // const code = error.code;
      Swal.fire({
        title: "לא ניתן להירשם",
        text: error.massage,
        icon: "error",
        // showCancelButton: true,
        // confirmButtonColor: "#",
        // cancelButtonColor: "#3085d6",
        confirmButtonText: "בוצע",
        // cancelButtonText: "בטל",
        // reverseButtons: true,
      }).then((result) => {
        //
      });
    }
  };

  return (
    <Box className="authWarraperSignup">
      <label className="SignupLabel">הרשמה</label>
      <InputsWrapper className="textsFieldsSignup">
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

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.privateNumber.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
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
            width: "85%",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              height: `${vhAsPixels}px`,
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
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.fullName.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
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
              : "שם מלא חייב לכלול שם פרטי ושם משפחה"
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

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.password.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
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
            width: "85%",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              height: `${vhAsPixels}px`,
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
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
            },

            "& .MuiOutlinedInput-input": {
              color: !formData.initialInputs.secPassword.error
                ? "white !important"
                : "red !important",
              fontSize: `${initialFontSize}px`,
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
            width: "85%",
            mb: "0.3rem",

            "& .MuiInputBase-root": {
              height: `${vhAsPixels}px`,
              color: "white !important",
              borderRadius: "5000px",
              backgroundColor: "#8EAEDE",
            },
            "& .MuiInputLabel-root": {
              color: "white !important",
              backgroundColor: "#8EAEDE",
              borderRadius: "500px",
              px: 1,
              fontSize: `${initialFontSize}px`,
            },

            "& .MuiFormHelperText-root": {
              fontSize: `${initialFontSize - 5}px`,
            },

            "& .MuiOutlinedInput-input": {
              color: "white !important",
              fontSize: `${initialFontSize}px`,
            },
          }}
          required={true}
          value={formData.initialInputs.commandsSelector.value}
          label="פיקוד"
          helperText="בחר פיקוד"
          select={true}
          onChange={handleInputChange}
        >
          {commands.map(
            (option) =>
              option.id !== 0 && (
                <MenuItem key={option.id} value={option.commandName}>
                  {option.commandName}
                </MenuItem>
              )
          )}
        </TextField>
      </InputsWrapper>

      <Box
        className="authActionsSignup"
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
          {/* <Link
            to={!formData.isValid ? "/signup" : "/manageEventes"} // of course we have to check if user exists and password is correct
            style={{
              color: "white",
              textDecoration: "none",
              width: "100%",
              height: "100%",
            }}
          > */}
          <Button
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
            onClick={() => handleSignup()}
            sx={{
              borderRadius: "5000px",
              fontSize: [
                "0.2rem",
                "0.4rem",
                "0.7rem",
                "1rem",
                "1.3rem",
                "1.6rem",
                "1.9rem",
              ],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            הירשם/י
          </Button>
          {/* </Link> */}
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
            className="linkToLogin"
            to="/login"
            style={{
              fontSize: ["small", "medium", "large", "large", "x-large"],
              textAlign: "center",
            }}
          >
            להתחברות עם משתמש קיים
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
