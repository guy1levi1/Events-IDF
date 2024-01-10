import { Box } from "@mui/material";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CompareIcon from "../../images/compareIcon.png";
import DeleteIcon from "../../images/DeleteIcon.png";
import EditTextsIcon from "../../images/EditTextsIcon.png";
import TableModeIcon from "../../images/tableModeIcon.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CommandCell from "../commandCell/CommandCell";
import { useFilename } from "../tableEditing/FilenameContext";
import * as XLSX from "xlsx";

import "./CardEvent.css";

export default function CardEvent({
  eventId,
  eventName,
  eventDate,
  eventLocation,
  description,
  eventCreator,
  commandsSelector,
  onDelete,
}) {
  const handleClickDeleteButton = () => {
    Swal.fire({
      title: "האם את/ה בטוח/ה שתרצה/י למחוק את האירוע  {שם האירוע}",
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
        onDelete();
        Swal.fire({
          title: "נמחק בהצלחה!",
          text: "האירוע {שם האירוע} נמחק בהצלחה.",
          icon: "success",
          confirmButtonText: "אישור",
        });
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
              ...row,
            };
            return newRow;
          });
        console.log("new rows from excel reader: ");
        // const transformedData = mapKeys(newRows, headers, eventId);
        // console.log(transformedData);

        navigate(`/crossInformation/${eventId}`, {
          state: {
            presentRows: newRows,
            eventName: eventName,
            eventDate: eventDate,
            eventLocation: eventLocation,
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
            {eventLocation} ,{eventDate}
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
            {commandsSelector.map((command, index) => (
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
              נוצר ע"י {eventCreator}
            </h5>
            <div>
              {/* need to send him with props of the current fields from db */}
              {/* will be table/:eventId */}
              <Link
                to={`/table/${eventId}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <img
                  src={TableModeIcon}
                  alt=""
                  style={{
                    width: "3.268rem",
                    height: "3.5rem",
                    cursor: "pointer",
                  }}
                />
              </Link>
              {/* need to send him to new page call editEvent with props of the current fields from db */}
              {/* will be editEvent/:eventId */}
              <Link
                to={`/editEvent/${eventId}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <img
                  src={EditTextsIcon}
                  alt=""
                  style={{
                    width: "3.268rem",
                    height: "3.5rem",
                    cursor: "pointer",
                  }}
                />
              </Link>
              <img
                src={DeleteIcon}
                onClick={handleClickDeleteButton}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.6rem",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}