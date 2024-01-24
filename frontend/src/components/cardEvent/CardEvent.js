import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CompareIcon from "../../images/compareIcon.png";
import DeleteIcon from "../../images/DeleteIcon.png";
import EditTextsIcon from "../../images/EditTextsIcon.png";
import TableModeIcon from "../../images/tableModeIcon.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CommandCell from "../commandCell/CommandCell";
import { useFilename } from "../../utils/contexts/FilenameContext";
import * as XLSX from "xlsx";

import "./CardEvent.css";
import { getFullNameById } from "../../utils/api/usersApi";
import { getEventCommandsByEventId } from "../../utils/api/eventCommandsApi";
import { getCommandNameById } from "../../utils/api/commandsApi";
import dayjs from "dayjs";
import { getEventRequestsByEventId } from "../../utils/api/eventRequestsApi";
// import dayjs from "dayjs";

export default function CardEvent({
  eventId,
  eventName,
  eventDate,
  eventLocation,
  description,
  eventCreator,
  isAdmin,
  // commandsSelector,
  onDelete,
}) {
  const handleClickDeleteButton = () => {
    Swal.fire({
      title: `האם את/ה בטוח/ה שתרצה/י למחוק את האירוע "${eventName}"`,
      text: "פעולה זאת איננה ניתנת לשחזור",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "מחק אירוע",
      cancelButtonText: "בטל",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // delete the event from db and update in the fronted
        onDelete(eventId);
      }
    });
  };

  const { setFilename } = useFilename();

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
              ...row,
            };
            return newRow;
          });

        navigate(`/crossInformation/${eventId}`, {
          state: {
            presentRows: newRows,
            eventName: eventName,
            eventDate: eventDate,
            description: description,
          },
        });

        // onRowsChange(newRows);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleViewData = () => {
    console.log("transformedData: ");
    console.log(transformedData);
    navigate(`/table/${eventId}`, {
      state: {
        transformedData: transformedData,
        eventName: eventName,
        eventDate: dayjs(eventDate).format("HH:mm DD.MM.YY"),
        eventLocation: eventLocation,
      },
    });
  };

  const handleEditClick = () => {
    console.log(eventDate);
    navigate(`/editEvent/${eventId}`, {
      state: {
        eventName: eventName,
        eventDate: eventDate,
        eventLocation: eventLocation,
        description: description,
        commands: arrayOfCommandsNames,
      },
    });
  };

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const [fullName, setFullName] = useState("");
  const [eventDayJs, setEventDayJs] = useState(null);
  const [arrayOfCommandsNames, setArrayOfCommandsNames] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const fullName = await getFullNameById(eventCreator);
        const eventCommands = await getEventCommandsByEventId(eventId);
        // Use Promise.all to wait for all promises to resolve
        const commandNamesPromises = eventCommands.map(
          async (commandObject) => {
            const commandName = await getCommandNameById(
              commandObject.commandId
            );
            return commandName;
          }
        );

        const commandNames = await Promise.all(commandNamesPromises);

        setArrayOfCommandsNames((prev) => [...prev, ...commandNames]);

        setEventDayJs(
          new Date(eventDate)
            .toLocaleString("he-IL", options)
            .replace(/\//g, ".")
        );
        setFullName(fullName);
        setTransformedData(await getEventRequestsByEventId(eventId));
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    fetchFullName();
  }, [eventCreator, eventId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          width: "30.1rem",
          background: "#D9D9D9",
          borderRadius: "2rem",
          padding: 0,
        }}
      >
        <div
          className="CardTexts"
          style={{
            paddingRight: "1.3rem",
            paddingLeft: "1rem",
            paddingTop: "0.4rem",
            margin: 0,
            width: "inherit",
            maxWidth: "inherit",
            height: "87%",
            maxHeight: "87%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontSize: "1.7rem", padding: 0, margin: 0 }}>
              {eventName}
            </h4>
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <img
                  src={CompareIcon}
                  alt="Compare Icon"
                  style={{
                    width: "3.268rem",
                    height: "3.6rem",
                    cursor: "pointer",
                    display: isAdmin ? "inline" : "none",
                  }}
                />
              </label>
              <button onClick={handleButtonClick} style={{ display: "none" }}>
                Upload File
              </button>
            </div>
          </div>
          <h5
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              whiteSpace: "normal",
              textOverflow: "ellipsis",
              fontWeight: "normal",
              fontSize: "1.2rem",
              padding: 0,
              marginTop: 0,
              marginBottom: 0,
              height: "4.4rem",
              width: "85%",
              maxWidth: "85%",
              lineHeight: "1.4rem",
            }}
          >
            {description}
          </h5>

          <h6
            style={{
              fontWeight: "Bold",
              fontSize: "0.9rem",
              padding: 0,
              margin: 0,
              marginTop: "0.5rem",
              width: "85%",
            }}
          >
            {eventLocation} ,{eventDayJs}
          </h6>
          <div
            className="commandsCells"
            id="commandsCells"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start ",
              width: "24.5rem",
              marginTop: "0.5rem",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            {arrayOfCommandsNames.map((command, index) => (
              <div style={{ margin: "0 0 0 0.2rem" }}>
                <CommandCell command={command} key={index}></CommandCell>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                fontWeight: "normal",
                fontSize: "1.2rem",
                padding: 0,
                margin: "1.5rem 0px 0px",
                marginTop: "0px",
                marginBottom: "0px",
                width: "45%",
              }}
            >
              נוצר ע"י {fullName}
            </h5>
            <div>
              {/* need to send him with props of the current fields from db */}
              {/* will be table/:eventId */}

              <img
                src={TableModeIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.5rem",
                  cursor: "pointer",
                }}
                onClick={handleViewData}
              />
              {/* need to send him to new page call editEvent with props of the current fields from db */}
              {/* will be editEvent/:eventId */}
              {/* <Link
                to={`/editEvent/${eventId}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              > */}
              <img
                src={EditTextsIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.5rem",
                  cursor: "pointer",
                  display: isAdmin ? "inline" : "none",
                }}
                onClick={handleEditClick}
              />
              {/* </Link> */}
              <img
                src={DeleteIcon}
                onClick={handleClickDeleteButton}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.6rem",
                  cursor: "pointer",
                  display: isAdmin ? "inline" : "none",
                }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
