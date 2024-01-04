import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelReader.css";

const ExcelReader = ({ onRowsChange, isCrossInformationTable, filename }) => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadFileInfo, setUploadFileInfo] = useState(filename != null ? `הועלה ${filename} קובץ` : "");
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
        setErrorMessage("");
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
              id: serialNumberCounter++,
              status: "pending",
              ...row,
            };
            return newRow;
          });

        onRowsChange(newRows);
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
        // marginTop: "0.7rem",
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
        style={{marginRight: "0.5rem",}}
      >
        {isCrossInformationTable ? "להעלאת טופס נוכחות חדש" : "להעלאת קובץ חדש"}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div style={{ marginTop: "-0.6rem" }}>
        {<p className="uploadFilenfo">{uploadFileInfo}</p>}
      </div>
    </div>
  );
};

export default ExcelReader;
