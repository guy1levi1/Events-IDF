import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = ({ onRowsChange, onColumnsChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Extract columns
      const headerRow = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
      const extractedColumns = headerRow.map((col, index) => ({ label: col, key: index }));
      onColumnsChange(extractedColumns);

      // Extract rows
      const extractedRows = XLSX.utils.sheet_to_json(sheet, { header: 'A' });
      onRowsChange(extractedRows);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
    </div>
  );
};

export default ExcelReader;
