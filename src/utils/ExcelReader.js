// Import necessary dependencies
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

// ExcelReader component
const ExcelReader = ({ onRowsChange }) => {
  const [rows, setRows] = useState([]);

  const generateUniqueID = () => {
    // Generate a unique ID based on the current timestamp
    return uuidv4();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Extract rows and add unique IDs
        const newRows = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(1).map((row) => {
          // Generate a unique ID for each row
          const id = generateUniqueID();
          return { id, ...row };
        });

        setRows(newRows);

        // Call the callback with the extracted rows
        onRowsChange(newRows);
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {/* Rest of your UI */}
    </div>
  );
};

export default ExcelReader;
