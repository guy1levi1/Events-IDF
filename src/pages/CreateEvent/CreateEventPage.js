import { Box, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import "./CreateEventPage.css";
import useForm from "../../utils/hooks/useForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputsWrapper from "../../utils/InputsWrapper";
import TableModeIcon from "../../images/tableModeIcon.png";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";

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
    value: localStorage.getItem("newEventName")
      ? localStorage.getItem("newEventName")
      : "",
    isValid: false,
    error: false,
  },
  eventDate: {
    // value: localStorage.getItem("newEventDate")
    //   ? localStorage.getItem("newEventDate")
    //   : dayjs(),
    value: dayjs(),
    isValid: false,
    error: false,
  },
  eventLocation: {
    value: localStorage.getItem("newEventLocation")
      ? localStorage.getItem("newEventLocation")
      : "",
    isValid: false,
    error: false,
  },
  commandsSelector: {
    value: localStorage.getItem("newEventCommands")
      ? localStorage.getItem("newEventCommands")
      : "",
    isValid: false,
    error: false,
  },
  description: {
    value: localStorage.getItem("newEventDescription")
      ? localStorage.getItem("newEventDescription")
      : "",
    isValid: false,
    error: false,
  },
};

function formatDate(date) {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    timeZone: "GMT",
  };

  // Format the date using the options
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

// Format the original date
const formattedDate = formatDate(dayjs());

console.log(formattedDate);
console.log(localStorage.getItem("newEventDate"));

const CHARACTER_LIMIT = 1000;

export default function CreateEventPage() {
  const { formData, handleInput, handleBlur } = useForm(formStates, false);
  const [dateError, setDateError] = useState(false);
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0); // Add initialFontSize state

  const handleSumbitNewEvent = () => {
    localStorage.removeItem("newEventName");
    localStorage.removeItem("newEventDate");
    localStorage.removeItem("newEventLocation");
    localStorage.removeItem("newEventCommands");
    localStorage.removeItem("newEventDescription");
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

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("File uploaded!");
      navigate("/table");

      // You can do additional processing with the file if needed
    }
  };

  const handleButtonClick = () => {
    localStorage.setItem(
      "newEventName",
      formData.initialInputs.eventName.value
    );
    localStorage.setItem(
      "newEventDate",
      formData.initialInputs.eventDate.value
    );
    localStorage.setItem(
      "newEventLocation",
      formData.initialInputs.eventLocation.value
    );
    localStorage.setItem(
      "newEventCommands",
      formData.initialInputs.commandsSelector.value
    );
    localStorage.setItem(
      "newEventDescription",
      formData.initialInputs.description.value
    );

    fileInputRef.current.click();
  };

  return (
    <div className="CreateEventPage">
      <div style={{ width: "60vw" }}>
        <h1 style={{ color: "white" }}>יצירת אירוע</h1>
      </div>

      <Box className="createEventWarraper">
        <InputsWrapper className="textsFieldscreateEvent">
          <TextField
            id="eventName"
            size="small"
            sx={{
              width: "90%",
              margin: "auto",

              mb: "0.3rem",

              "& .MuiInputBase-root": {
                height: `${vhAsPixels}px`,
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
                fontSize: `${initialFontSize}px`,
                // fontSize: "16.2px",
              },
              "& .MuiFormHelperText-root": {
                fontSize: `${initialFontSize - 5}px`,
              },

              "& .MuiOutlinedInput-input": {
                color: !formData.initialInputs.eventName.error
                  ? "white !important"
                  : "red !important",
                fontSize: `${initialFontSize}px`,
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
            inputProps={{
              style: {},
            }}
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
                width: "90%",
                margin: "auto",
                mb: "0.3rem",

                "& .MuiInputBase-root": {
                  height: `${vhAsPixels}px`,
                  color: "white !important",
                  borderRadius: "5000px",
                  backgroundColor: !dateError ? "#8EAEDE" : "#d9d9d9",
                },
                "& .MuiInputLabel-root": {
                  color: !dateError ? "white !important" : "red !important",
                  backgroundColor: !dateError ? "#8EAEDE" : "#d9d9d9",
                  borderRadius: "500px",
                  px: 1,
                  fontSize: `${initialFontSize}px`,
                },
                "& .MuiInputBase-input": {
                  fontSize: `${initialFontSize - 5}px`,
                },
                "& .MuiFormHelperText-root": {
                  fontSize: `${initialFontSize - 5}px`,
                },

                "& .MuiOutlinedInput-input": {
                  color: !dateError ? "white !important" : "red !important",
                  fontSize: `${initialFontSize}px`,
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
              width: "90%",
              margin: "auto",
              mb: "0.3rem",

              "& .MuiInputBase-root": {
                height: `${vhAsPixels}px`,

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
                fontSize: `${initialFontSize}px`,
              },

              "& .MuiFormHelperText-root": {
                fontSize: `${initialFontSize - 5}px`,
              },

              "& .MuiOutlinedInput-input": {
                color: !formData.initialInputs.eventLocation.error
                  ? "white !important"
                  : "red !important",
                fontSize: `${initialFontSize}px`,
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
              width: "90%",
              margin: "auto",
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
              width: "90%",
              margin: "auto",
              mb: "0.3rem",

              "& .MuiInputBase-root": {
                height: `${vhAsPixels * 3}px`,
                color: "white !important",
                borderRadius: "35px",

                backgroundColor: "#8EAEDE",
              },
              "& .MuiInputLabel-root": {
                color: "white !important",

                backgroundColor: "#8EAEDE",

                borderRadius: "500px",
                px: 1,
                fontSize: `${initialFontSize}px`,
              },

              "& .MuiOutlinedInput-input": {
                color: "white !important",
                fontSize: `${initialFontSize}px`,
                // paddingTop: "5px"
              },
              "& .MuiFormHelperText-root": {
                color:
                  formData.initialInputs.description.isValid ||
                  formData.initialInputs.description.value === ""
                    ? "rgba(0, 0, 0, 0.6)"
                    : "red",
                textAlign: "right",
                fontSize: `${initialFontSize - 5}px`,
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
        <Box
          className="createEventActions"
          sx={{ height: `${vhAsPixels * 1.35}px` }}
        >
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            sx={{
              width: "28%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to={!formData.isValid ? "/createEvent" : "/manageEventes"} // of course we have to check if user exists and password is correct
              style={{
                color: "white",
                textDecoration: "none",
                width: "100%",
                height: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={!formData.isValid}
                onClick={handleSumbitNewEvent}
                sx={{
                  borderRadius: "5000px",
                  fontSize: ["0.9rem", "1.1rem", "1.3rem", "1.5rem"],
                }}
                style={{ width: "100%", height: "100%" }}
              >
                יצירת אירוע
              </Button>
            </Link>
          </Box>
          {/* <Link
            to={!formData.isValid ? "/createEvent" : "/manageEventes"}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          ></Link> */}
          <Box
            sx={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
                id="fileInput" // Assign an id for association with label
                onClick={handleButtonClick}
              />
              <label htmlFor="fileInput">
                <img
                  src={TableModeIcon}
                  alt=""
                  style={{
                    width: `${vhAsPixels * 1.35 * 0.95}px`,
                    height: "100%",
                    // position: "absolute",
                    // left: "1.5rem",
                    // bottom: "0.4rem",
                    cursor: "pointer",
                    // marginLeft: "12px"
                  }}
                />
              </label>
              <button style={{ display: "none" }}>Upload File</button>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
