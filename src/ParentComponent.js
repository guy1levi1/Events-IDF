import React, { useState } from 'react';
import ExcelReader from './ExcelReader'; // Adjust the path as needed

const ParentComponent = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // Callback functions to receive data from ExcelReader
  const handleColumnsChange = (data) => {
    setColumns(data);
  };

  const handleRowsChange = (data) => {
    setRows(data);
  };

  return (
    <div>
      <ExcelReader onColumnsChange={handleColumnsChange} onRowsChange={handleRowsChange} />
      {}
      <div>
        <h3>Columns:</h3>
        <pre>{JSON.stringify(columns, null, 2)}</pre>
      </div>
      <div>
        <h3>Rows:</h3>
        <pre>{JSON.stringify(rows, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ParentComponent;
