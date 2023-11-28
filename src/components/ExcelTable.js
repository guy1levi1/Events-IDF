import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Icon, TextField } from "@mui/material";
import * as XLSX from "xlsx";
import { Delete, Edit } from "@mui/icons-material";
import { heIL } from "@mui/x-data-grid";
import convertExcelToJson from "../ExcelReader";


const ExcelTable = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [newRow, setNewRow] = useState({}); // State to track the new row being added
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      convertExcelToJson(file);
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headerRow = sheetData[0];

        const gridColumns = headerRow.map((header, index) => ({
          field: `col${index + 1}`,
          headerName: header,
          flex: 1,
        }));

        // Adding an additional column for actions
        gridColumns.push({
          field: "actions",
          headerName: "Actions",
          flex: 1,
          renderCell: (params) => (
            <>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Icon>Edit</Icon>}
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </Button>
              <Edit
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </Edit>
              <Delete
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
              ></Delete>
            </>
          ),
        });

        const gridRows = sheetData.slice(1).map((row, rowIndex) => ({
          id: rowIndex,
          editale: true,
          ...row.reduce((acc, cell, cellIndex) => {
            acc[`col${cellIndex + 1}`] = cell;
            return acc;
          }, {}),
        }));
        console.log(gridColumns);
        console.log(gridRows);

        setColumns(gridColumns);
        setRows(gridRows);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSave = () => {
    // Add the new row to the rows state
    setRows([...rows, newRow]);

    // Reset the new row state and exit editing mode
    setNewRow({});
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    // Filter out the row with the specified id
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      console.log(updatedRows); // Log the updated state
      return updatedRows;
    });
  };

  const handleEdit = (id) => {
    console.log(id);
    // Set the new row state to the row being edited
    setNewRow(rows.find((row) => row.id === id));
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset the new row state and exit editing mode
    setNewRow({});
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    // Update the new row state with the input value
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log(rows)}
      >
        Print Data
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          sx={{ direction: "rtl" }}
        />

        {/* Add new row section */}
        {isEditing && (
          <div>
            
            {columns.map((column) => (
              <TextField
                key={column.field}
                label={column.headerName}
                value={newRow[column.field] || ""}
                onChange={(e) => handleInputChange(e, column.field)}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelTable;
