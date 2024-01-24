import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import useForm from "../../utils/hooks/useForm";
import InputsWrapper from "../../utils/InputsWrapper";
import TableModeIcon from "../../images/tableModeIcon.png";
import { useFilename } from "../../utils/contexts/FilenameContext";
import CommandsMultiSelect from "../../components/CommandsMultiSelect";
import "./EditEventPage.css";
import { getEventById } from "../../utils/api/eventsApi";
const { v4: uuidv4 } = require("uuid");

const eventName = "פריסת שחרור לאור";

const currentDate = dayjs();
const eventLocation = 'תל השומר מקל"ר';
const description = `נערוך לאורצ'וק פריסת שחרור, באירוע נחגוג את היציאה לאזרחות של
אור(אפילו שהוא תוך שנייה חוזר למילואים), מוזמנים! 😀`;
// const eventCreator = "גיא לוי";

const commandsSelector = ["מרכז", "צפון"];

const CHARACTER_LIMIT = 1000;

export default function EditEventPage(props) {
  const { eventId } = useParams();
  const location = useLocation();

  const eventName = location.state.eventName;
  const eventDate = location.state.eventDate;
  const eventLocation = location.state.eventLocation;
  const eventDescription = location.state.description;
  const eventCommands = location.state.commands;

  console.log(
    eventName,
    eventDate,
    eventLocation,
    eventDescription,
    eventCommands
  );

  const formStates = {
    eventName: {
      value: eventName,
      isValid: true,
      error: false,
    },
    eventDate: {
      value: dayjs(eventDate).format("HH:mm DD.MM.YY"),
      isValid: true,
      error: false,
    },
    eventLocation: {
      value: eventLocation,
      isValid: true,
      error: false,
    },
    commandsSelector: {
      value: eventCommands,
      isValid: true,
      error: false,
    },
    description: {
      value: eventDescription,
      isValid: true,
      error: false,
    },
  };
  const headers = [
    "serialNumber",
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

  // Parse the JSON stored in localStorage
  const formDataFromLocalStorage = localStorage.getItem("newEditFormstates")
    ? JSON.parse(localStorage.getItem("newEditFormstates"))
    : null;
  // Change the value of eventDate using dayjs
  if (
    formDataFromLocalStorage &&
    formDataFromLocalStorage.eventDate.value !== null
  ) {
    formDataFromLocalStorage.eventDate.value = dayjs(
      formDataFromLocalStorage.eventDate.value
    );
  }

  const { formData, handleInput, handleBlur } = useForm(
    formDataFromLocalStorage || formStates,
    JSON.parse(localStorage.getItem("newEditFormIsValid")) || false
  );
  const [dateError] = useState(false);
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0); // Add initialFontSize state

  const handleEditEventClick = () => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
    setFilename("");
  };

  const handleInputChange = (e) => {
    handleInput(e);
  };

  const handleBlurChange = (e) => {
    handleBlur(e.target.id);
  };

  const clamp = (min, value, max) => {
    return `clamp(${min}, ${value}, ${max})`;
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
        await getEventById(eventId);
      } catch (error) {
        console.error("Error getting event by id : ", error);
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
  }, [getEventById, eventId]);

  const { filename, setFilename } = useFilename();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.setItem(
      "newEditFormstates",
      JSON.stringify(formData.initialInputs)
    );
    localStorage.setItem(
      "newEditFormIsValid",
      JSON.stringify(formData.isValid)
    );
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    handleButtonClick();
    const file = e.target.files[0];
    setFilename(file.name);

    if (file) {
      const reader = new FileReader();

      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log(`File selected: ${file.name}, size: ${file.size} bytes`);
      } else {
        console.error("Invalid file type");
        throw new Error(
          "Invalid file type. Please upload a valid Excel file (xlsx or xls)."
        );
      }

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

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

        navigate(`/table/${eventId}`, {
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
    }
  };

  return (
    <div className="CreateEventPage">
      <div style={{ width: "60vw" }}>
        <h1 style={{ color: "white" }}>עריכת אירוע</h1>
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
              formData.initialInputs.commandsSelector.value.length > 0
                ? formData.initialInputs.commandsSelector.value
                : null
            }
            commandsFromEdit={formData.initialInputs.commandsSelector.value}
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
              to={!formData.isValid ? "/createEvent" : "/manageEvents"}
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
                onClick={handleEditEventClick}
                sx={{
                  borderRadius: "5000px",
                  fontSize: ["0.9rem", "1.1rem", "1.3rem", "1.5rem"],
                }}
                style={{ width: "100%", height: "100%" }}
              >
                עריכת אירוע
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
