import { Box } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import "./CreateEvent.css";
import TryTextFieldRTL from "../../utils/auth/TryTextFieldRTL";
import useForm from "../../utils/hooks/useForm";

const formStates = {
  eventName: {
    value: "",
    isValid: false,
    error: false,
  },
  eventDate: {
    value: "",
    isValid: false,
    error: false,
  },
  eventLocation: {
    value: "",
    isValid: false,
    error: false,
  },
  description: {
    value: "",
    isValid: false,
    error: false,
  }
};

export default function CreateEventPage() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };
  return (
    <div
      className="ManageUserPage"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        margin: "auto",
      }}
    >
      <label className="loginLabelLogin">יצירת אירוע</label>

      <Box className="createEventWarraper">
        <Box className="textsFieldscreateEvent">
          <TryTextFieldRTL
            id="eventname"
            required={true}
            error={formData.initialInputs.eventName.error}
            value={formData.initialInputs.eventName.value}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            labelTextField="שם אירוע"
            helperText={
              !formData.initialInputs.eventName.error
                ? "בעל 7 ספרות"
                : "הכנס 7 ספרות בלבד"
            }
            typeofTextField="regular"
          />
        </Box>
        <Box className="createEventActions">
          <Button
            variant="contained"
            color="primary"
            // disabled={!formData.isValid}
            sx={{ mt: "50px", mb: "15px", borderRadius: "5000px" }}
          >
            יצירת אירוע
          </Button>
        </Box>
      </Box>
    </div>
  );
}
