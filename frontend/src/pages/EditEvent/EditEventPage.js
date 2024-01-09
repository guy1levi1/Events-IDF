import { Box, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import "./EditEventPage.css";
import useForm from "../../utils/hooks/useForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputsWrapper from "../../utils/InputsWrapper";
import TableModeIcon from "../../images/tableModeIcon.png";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useFilename } from "../../components/tableEditing/FilenameContext";
import * as XLSX from "xlsx";
import CommandsMultiSelect from "../../components/CommandsMultiSelect";

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

const eventName = "פריסת שחרור לאור";
// const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" };

const currentDate = dayjs();
const eventLocation = 'תל השומר מקל"ר';
const description = `נערוך לאורצ'וק פריסת שחרור, באירוע נחגוג את היציאה לאזרחות של
אור(אפילו שהוא תוך שנייה חוזר למילואים), מוזמנים! 😀`;
// const eventCreator = "גיא לוי";

const commandsSelector = ["מרכז", "צפון"];

const CHARACTER_LIMIT = 1000;

export default function EditEventPage(props) {
  const formStates = {
    eventName: {
      value: eventName,
      isValid: true,
      error: false,
    },
    eventDate: {
      value: currentDate,
      isValid: true,
      error: false,
    },
    eventLocation: {
      value: eventLocation,
      isValid: true,
      error: false,
    },
    commandsSelector: {
      value: [],
      isValid: true,
      error: false,
    },
    description: {
      value: description,
      isValid: true,
      error: false,
    },
  };

  const { eventId } = useParams();
  console.log(currentDate);

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

  const { formData, handleInput, handleBlur } = useForm(formStates, true);
  const [dateError] = useState(false);
  const [vhAsPixels, setVhAsPixels] = useState(0);
  const [initialFontSize, setInitialFontSize] = useState(0); // Add initialFontSize state

  const handleEditEventClick = () => {
    console.log("edit event clicked");
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

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const { filename, setFilename } = useFilename();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.setItem(
      "editEventName",
      formData.initialInputs.eventName.value
    );
    localStorage.setItem(
      "editEventDate",
      formData.initialInputs.eventDate.value
    );
    localStorage.setItem(
      "editEventLocation",
      formData.initialInputs.eventLocation.value
    );
    localStorage.setItem(
      "editEventCommands",
      formData.initialInputs.commandsSelector.value
    );
    localStorage.setItem(
      "editEventDescription",
      formData.initialInputs.description.value
    );

    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFilename(file.name);

    if (file) {
      const reader = new FileReader();

      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log(`הועלה ${file.name} קובץ`);
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
        console.log("new rows from excel reader: ");
        const transformedData = mapKeys(newRows, headers, eventId);
        console.log(transformedData);

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
              // onError={(newError) => setDateError(newError)}
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
            commandsFromEdit={commandsSelector}
            // {
            //   formData.initialInputs.commandsSelector.value.length > 0
            //     ? formData.initialInputs.commandsSelector.value.join(",")
            //     : null
            // }
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

              <button onClick={handleButtonClick} style={{ display: "none" }}>
                Upload File
              </button>
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
