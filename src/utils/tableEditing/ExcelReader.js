// Import necessary dependencies
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelReader.css";

// ExcelReader component
const ExcelReader = ({ onRowsChange }) => {
  // const [rows, setRows] = useState([]);
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadFileInfo, setUploadFileInfo] = useState("");
  let serialNumberCounter = 1;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Handle the valid Excel file
        setErrorMessage("");
        // setUploadFileInfo(`גודל ${file.size} ביטים  ,${file.name} שם קובץ`);
        setUploadFileInfo(`הועלה ${file.name}  קובץ`);
        console.log(`File selected: ${file.name}, size: ${file.size} bytes`);
      } else {
        // Display an error message for unsupported file types
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

        // Extract rows and add serial numbers
        const newRows = XLSX.utils
          .sheet_to_json(sheet, { header: 1 })
          .slice(1)
          .map((row) => {
            // Add a new property to each row with a serial number
            const newRow = {
              id: serialNumberCounter++,
              status: "pending",
              ...row,
            };
            return newRow;
          });

        // setRows(newRows);

        // Call the callback with the extracted rows
        onRowsChange(newRows);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick} className="rounded-button">
        העלה/י קובץ
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {<p className="upload-file-info">{uploadFileInfo}</p>}
    </div>
  );
};

export default ExcelReader;
