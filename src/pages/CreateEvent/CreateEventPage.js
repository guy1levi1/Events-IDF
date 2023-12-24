import { Box, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./CreateEvent.css";
import useForm from "../../utils/hooks/useForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputsWrapper from "../../utils/InputsWrapper";
import TableModeIcon from "../../images/tableModeIcon.png";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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
  eventName: {
    value: "",
    isValid: false,
    error: false,
  },
  eventDate: {
    value: dayjs(),
    isValid: false,
    error: false,
  },
  eventLocation: {
    value: "",
    isValid: false,
    error: false,
  },
  commandsSelector: {
    value: "",
    isValid: false,
    error: false,
  },
  description: {
    value: "",
    isValid: false,
    error: false,
  },
};

const CHARACTER_LIMIT = 1000;

export default function CreateEventPage() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);
  const [dateError, setDateError] = useState(false);

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
      <label className="createEventLabel">יצירת אירוע</label>

      <Box className="createEventWarraper">
        <InputsWrapper className="textsFieldscreateEvent">
          <TextField
            id="eventName"
            size="small"
            sx={{
              width: "55rem",
              mb: "0.3rem",

              "& .MuiInputBase-root": {
                color: "white !important",
                borderRadius: "5000px",
                backgroundColor: !formData.initialInputs.eventName.error
                  ? "#8EAEDE"
                  : "#d9d9d9",
              },
              "& .MuiInputLabel-root": {
                color: !formData.initialInputs.eventName.error
                  ? "white !important"
                  : "red !important",
                backgroundColor: !formData.initialInputs.eventName.error
                  ? "#8EAEDE"
                  : "#d9d9d9",
                borderRadius: "500px",
                px: 1,
              },

              "& .MuiOutlinedInput-input": {
                color: !formData.initialInputs.eventName.error
                  ? "white !important"
                  : "red !important",
              },
            }}
            required={true}
            error={formData.initialInputs.eventName.error}
            value={formData.initialInputs.eventName.value}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            label="שם האירוע"
            helperText={
              !formData.initialInputs.eventName.error
                ? "הכנס את שם האירוע"
                : "מקסימום 50 תווים"
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="With Time Clock"
              ampm={false}
              format="HH:mm DD/MM/YYYY"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              value={formData.initialInputs.eventDate.value}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              sx={{
                width: "55rem",
                mb: "0.3rem",

                "& .MuiInputBase-root": {
                  color: "white !important",
                  borderRadius: "5000px",
                  backgroundColor: !dateError ? "#8EAEDE" : "#d9d9d9",
                },
                "& .MuiInputLabel-root": {
                  color: !dateError ? "white !important" : "red !important",
                  backgroundColor: !dateError ? "#8EAEDE" : "#d9d9d9",
                  borderRadius: "500px",
                  px: 1,
                },

                "& .MuiOutlinedInput-input": {
                  color: !dateError ? "white !important" : "red !important",
                },
              }}
              slotProps={{
                textField: {
                  id: "eventDate",
                  size: "small",
                  label: "תאריך האירוע",
                  helperText: !dateError
                    ? "הכנס את תאריך האירוע"
                    : "תאריך אינו תקין, הכנס תאריך עדכני",
                },
              }}
              minDateTime={dayjs().subtract(1, "minute")}
              onError={(newError) => setDateError(newError)}
            />
          </LocalizationProvider>
          <TextField
            id="eventLocation"
            size="small"
            sx={{
              width: "55rem",
              mb: "0.3rem",

              "& .MuiInputBase-root": {
                color: "white !important",
                borderRadius: "5000px",
                backgroundColor: !formData.initialInputs.eventLocation.error
                  ? "#8EAEDE"
                  : "#d9d9d9",
              },
              "& .MuiInputLabel-root": {
                color: !formData.initialInputs.eventLocation.error
                  ? "white !important"
                  : "red !important",
                backgroundColor: !formData.initialInputs.eventLocation.error
                  ? "#8EAEDE"
                  : "#d9d9d9",
                borderRadius: "500px",
                px: 1,
              },

              "& .MuiOutlinedInput-input": {
                color: !formData.initialInputs.eventLocation.error
                  ? "white !important"
                  : "red !important",
              },
            }}
            required={true}
            error={formData.initialInputs.eventLocation.error}
            value={formData.initialInputs.eventLocation.value}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            label="מיקום האירוע"
            helperText={
              !formData.initialInputs.eventLocation.error
                ? "הכנס את מיקום האירוע"
                : "מקסימום 50 תווים"
            }
          />

          <TextField
            id="outlined-select-currency"
            name="commandsSelector"
            size="small"
            sx={{
              width: "55rem",
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
            value={formData.initialInputs.commandsSelector.value}
            label="פיקוד"
            helperText="בחר פיקוד"
            select={true}
            onChange={handleInputChange}
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

          <TextField
            id="description"
            size="small"
            sx={{
              width: "55rem",
              mb: "0.3rem",

              "& .MuiInputBase-root": {
                color: "white !important",
                borderRadius: "35px",
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
              "& .MuiFormHelperText-root": {
                color:
                  formData.initialInputs.description.isValid ||
                  formData.initialInputs.description.value === ""
                    ? "rgba(0, 0, 0, 0.6)"
                    : "red",
                textAlign: "right",
              },
            }}
            required={true}
            error={formData.initialInputs.description.error}
            value={formData.initialInputs.description.value}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            label="תיאור האירוע"
            helperText={`${formData.initialInputs.description.value.length}/${CHARACTER_LIMIT}`}
            multiline
            rows={5}
          />
        </InputsWrapper>
        <Box className="createEventActions">
          <Link
            to={!formData.isValid ? "/createEvent" : "/manageEventes"}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <Button
              href="/manageEventes"
              variant="contained"
              color="primary"
              disabled={!formData.isValid}
              sx={{ mt: "20px", mb: "15px", borderRadius: "5000px" }}
            >
              יצירת אירוע
            </Button>
          </Link>
        </Box>
        <img
          src={TableModeIcon}
          alt=""
          style={{
            width: "3rem",
            height: "3.213rem",
            position: "absolute",
            left: "1.5rem",
            bottom: "0.4rem",
            cursor: "pointer",
          }}
        />
      </Box>
    </div>
  );
}
