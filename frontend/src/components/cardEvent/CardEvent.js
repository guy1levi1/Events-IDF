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
import generateGuid from "../../utils/GenereateUUID";

export default function CardEvent({
  eventId,
  eventName,
  eventDate,
  eventLocation,
  description,
  eventCreator,
  isAdmin,
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
        onDelete(eventId, eventName);
      }
    });
  };

  const { setFilename } = useFilename();
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDescription, setIsHoveredDescription] = useState(false);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFilename(file.name);

    if (file) {
      const reader = new FileReader();

      console.log(file.type);
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log(`File selected: ${file.name}, size: ${file.size} bytes`);

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
              eventDate: dayjs(eventDate).format("HH:mm DD.MM.YY"),
              eventLocation: eventLocation,
            },
          });
        };

        reader.readAsBinaryString(file);
      } else {
        console.log(
          "Invalid file type. Please upload a valid Excel file (xlsx or xls)."
        );

        Swal.fire({
          icon: "error",
          title: "סוג קובץ אינו תקין",
          text: "ניתן להעלות קצבי אקסל בלבד",
        });
      }
    }
  };

  const handleViewData = () => {
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

  const [fullName, setFullName] = useState("");
  const [eventDayJs, setEventDayJs] = useState(null);
  const [arrayOfCommandsNames, setArrayOfCommandsNames] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const fetchFullName = async () => {
      try {
        const fullName = await getFullNameById(eventCreator);
        const eventCommands = await getEventCommandsByEventId(eventId);
        const commandNamesPromises = eventCommands.map(
          async (commandObject) => {
            const commandName = await getCommandNameById(
              commandObject.commandId
            );
            return commandName;
          }
        );

        // Use Promise.all to wait for all promises to resolve
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
  }, [eventCreator, eventId, eventDate]);

  return (
    <div
      key={generateGuid()}
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
            <div style={{ position: "relative" }}>
              <h4
                style={{
                  fontSize: "1.7rem",
                  padding: 0,
                  margin: 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "23rem",
                  maxWidth: "23rem",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {eventName}
              </h4>

              {isHovered && eventName.length > 26 && (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#f0f0f0", // Customize background color
                    padding: "5px",
                    border: "1px solid #ccc", // Customize border style
                    borderRadius: "5px", // Customize border radius
                    maxWidth: "300px", // Customize maximum width
                    zIndex: 1,
                  }}
                >
                  {eventName}
                </div>
              )}
            </div>

            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
                id={"fileInput" + eventId}
              />
              <label htmlFor={"fileInput" + eventId}>
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
            </div>
          </div>
          <div style={{ position: "relative" }}>
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
                height: "4.6rem",
                width: "23rem",
                maxWidth: "23rem",
              }}
              onMouseEnter={() => setIsHoveredDescription(true)}
              onMouseLeave={() => setIsHoveredDescription(false)}
            >
              {description}
            </h5>

            {isHoveredDescription && description.length > 110 && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "#f0f0f0", // Customize background color
                  padding: "5px",
                  border: "1px solid #ccc", // Customize border style
                  borderRadius: "5px", // Customize border radius
                  zIndex: 1,
                  maxWidth: "300px", // Customize maximum width
                }}
              >
                {description}
              </div>
            )}
          </div>
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
            {arrayOfCommandsNames.map((command) => (
              <div style={{ margin: "0 0 0 0.2rem" }} key={command.id}>
                <CommandCell key={command.id} command={command}></CommandCell>
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
