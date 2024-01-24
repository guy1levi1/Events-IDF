import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelReader.css";
import generateGuid from "../../utils/GenereateUUID";
import { useFilename } from "../../utils/contexts/FilenameContext";
const { v4: uuidv4 } = require("uuid");

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

const ExcelReader = ({ onRowsChange, eventId }) => {
  console.log(eventId)
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { filename, setFilename } = useFilename();
  const [uploadFileInfo, setUploadFileInfo] = useState(
    filename != null ? `הועלה ${filename} קובץ` : ""
  );

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
        setUploadFileInfo(`הועלה ${file.name} קובץ`);
        console.log(`File selected: ${file.name}, size: ${file.size} bytes`);
      } else {
        setErrorMessage(
          "Invalid file type. Please upload a valid Excel file (xlsx or xls)."
        );
        console.error("Invalid file type");
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
              id: uuidv4(),
              status: "pending",
              ...row,
            };
            return newRow;
          });
        const transformedData = mapKeys(newRows, headers, eventId);


        console.log(transformedData)
        onRowsChange(
          transformedData.map((row) => {
            return { ...row, id: uuidv4() };
          })
        );
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
        flexDirection: "column",
        right: 0,
      }}
    >
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        className="rounded-button"
        style={{ marginRight: "0.5rem" }}
      >
        להעלאת קובץ חדש
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div style={{ marginTop: "-0.6rem" }}>
        {<p className="uploadFilenfo">{uploadFileInfo}</p>}
      </div>
    </div>
  );
};

export default ExcelReader;
