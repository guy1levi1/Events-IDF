import { Box, TextField } from "@mui/material";
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
import { useFilename } from "../../utils/contexts/FilenameContext";
import * as XLSX from "xlsx";
import CommandsMultiSelect from "../../components/CommandsMultiSelect";
import { createEvent } from "../../utils/api/eventsApi";
import Swal from "sweetalert2";
const { v4: uuidv4 } = require("uuid");

const formStates = {
  eventName: {
    value: "",
    isValid: false,
    error: false,
  },
  eventDate: {
    value: null,
    isValid: false,
    error: false,
  },
  eventLocation: {
    value: "",
    isValid: false,
    error: false,
  },
  commandsSelector: {
    value: [],
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

// Define the CreateEventPage component as the default export
export default function CreateEventPage() {
  // Parse the JSON stored in localStorage for form data or set it to null if not present
  const formDataFromLocalStorage = localStorage.getItem("newFormstates")
    ? JSON.parse(localStorage.getItem("newFormstates"))
    : null;

  // Convert the stored event date value to a dayjs object if it exists
  if (
    formDataFromLocalStorage &&
    formDataFromLocalStorage.eventDate.value !== null
  ) {
    formDataFromLocalStorage.eventDate.value = dayjs(
      formDataFromLocalStorage.eventDate.value
    );
  }

  // Destructure values and functions from the custom useForm hook
  const { formData, handleInput, handleBlur } = useForm(
    formDataFromLocalStorage || formStates,
    JSON.parse(localStorage.getItem("newFormIsValid")) || false
  );

  // State variables for date error, viewport height as pixels, and initial font size
  const [dateError, setDateError] = useState(false);
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0);

  // Static eventId and headers for the form
  const eventId = 1;
  const headers = [
    "sertialNumber",
    "privateNumber",
    "firstName",
    "lastName",
    "command",
    "division",
    "unit",
    "rank",
    "appointmentRank",
    "appointmentLetter",
    "reasonNonArrival",
  ];

  // Function to map keys from raw data to a new structure with eventId and status
  const mapKeys = (data, headers, eventId) => {
    return data.map((item) => {
      const newItem = { eventId: eventId };
      headers.forEach((key, index) => {
        newItem[key] = item[index];
      });
      newItem.status = "pending";
      return newItem;
    });
  };

  // Function to handle submission of a new event, clearing stored form data and filename
  const handleSumbitNewEvent = async () => {
    const newEvent = {
      id: uuidv4(),
      name: formData.initialInputs.eventName.value,
      date: formData.initialInputs.eventDate.value,
      place: formData.initialInputs.eventLocation.value,
      description: formData.initialInputs.description.value,
      userId: JSON.parse(localStorage.getItem("userData"))?.userId || null,
    };
    try {
      const response = await createEvent(newEvent);
      console.log(response);
      // console.log("Server response:", response.data);

      // annimation success
      Swal.fire({
        title: "אירוע נוצר בהצלחה",
        text: "",
        icon: "success",
        confirmButtonText: "בוצע",
      }).then((result) => {
        navigate("/manageEventes");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "לא ניתן ליצור אירוע",
        text: error.massage,
        icon: "error",
        confirmButtonText: "נסה שנית",
      }).then((result) => {
        //
      });
    }

    localStorage.removeItem("newFormstates");
    localStorage.removeItem("newFormIsValid");
    setFilename("");
  };

  // Event handlers for form input changes and blurs
  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  // Utility function to clamp a value between a minimum and maximum
  const clamp = (min, value, max) => {
    return `clamp(${min}, ${value}, ${max})`;
  };

  // Effect hook to handle window resize events and set vhAsPixels and initialFontSize
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

    // Initial resize call and event listener setup
    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Cleanup function to remove event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Destructuring values and functions from the useFilename hook
  const { filename, setFilename } = useFilename();

  // Ref for file input element and navigation hook
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Function to handle button click, store form data in localStorage, and trigger file input click
  const handleButtonClick = () => {
    localStorage.setItem(
      "newFormstates",
      JSON.stringify(formData.initialInputs)
    );
    localStorage.setItem("newFormIsValid", JSON.stringify(formData.isValid));
    fileInputRef.current.click();
  };

  // Function to handle file upload, read and parse Excel file, and navigate to the table page
  const handleFileUpload = (e) => {
    handleButtonClick();
    const file = e.target.files[0];
    setFilename(file.name);

    if (file) {
      const reader = new FileReader();

      // Validate file type
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Read and process the Excel file
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Transform raw data and navigate to the table page
          const newRows = XLSX.utils
            .sheet_to_json(sheet, { header: 1 })
            .slice(1)
            .map((row) => {
              const newRow = {
                eventId: "EVENTID",
                ...row,
                status: "pending",
              };
              return newRow;
            });
          const transformedData = mapKeys(newRows, headers, eventId);

          navigate(`/table/new`, {
            state: {
              transformedData: transformedData,
              eventName: formData.initialInputs.eventName.value,
              eventDate: dayjs(formData.initialInputs.eventDate.value).format(
                "HH:mm DD.MM.YY"
              ),
              eventLocation: formData.initialInputs.eventLocation.value,
            },
          });
        };

        reader.readAsBinaryString(file);
      } else {
        console.error("Invalid file type");
        throw new Error(
          "Invalid file type. Please upload a valid Excel file (xlsx or xls)."
        );
      }
    }
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
              id="eventDate"
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

          <CommandsMultiSelect
            formData={formData}
            initialFontSize={initialFontSize}
            onChange={handleInput}
            onBlur={handleBlur}
            commandsFromLocalStorage={
              // {["מרכז", "צפון"]}
              formData.initialInputs.commandsSelector.value.length > 0
                ? formData.initialInputs.commandsSelector.value
                : null
            }
          />

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
              to={!formData.isValid ? "/createEvent" : "/manageEventes"}
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
          <Box
            sx={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                direction: "ltr",
              }}
            >
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <img
                  src={TableModeIcon}
                  alt=""
                  style={{
                    width: `${vhAsPixels * 1.35 * 0.95}px`,
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </label>

              <button style={{ display: "none" }}>Upload File</button>

              <div style={{ marginTop: "-0.6rem" }}>
                <p
                  style={{
                    fontSize: `${clamp(
                      "0.25rem",
                      "calc(0.25rem + 0.5vw)",
                      "1.2rem"
                    )}`,
                    margin: 0,
                  }}
                >
                  {filename}
                </p>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
