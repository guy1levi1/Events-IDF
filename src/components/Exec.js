import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Exec() {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [rowMode, setRowMode] = React.useState();

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      return updatedRows;
    });
  };

  const handleEditClick = (id) => {
    setRowModesModel((prevRowModesModel) => {
      const existingMode = prevRowModesModel[id]?.mode;
      const newMode =
        existingMode === GridRowModes.Edit
          ? GridRowModes.View
          : GridRowModes.Edit;

      return {
        ...prevRowModesModel,
        [id]: { mode: newMode },
      };
    });
  };
  const handleSaveClick = (id) => {
    setRowModesModel((prevRowModesModel) => {
      return {
        ...prevRowModesModel,
        [id]: { mode: GridRowModes.View },
      };
    });
  };

  const handleCancelClick = (id) => {
    setRowModesModel((prevRowModesModel) => {
      return {
        ...prevRowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      };
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  React.useEffect(() => {
    console.log(rowModesModel[3]?.mode === GridRowModes.Edit);
    console.log(rowModesModel);
  }, [rowModesModel]);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

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
          editable: true,
        }));

        gridColumns.push({
          field: "actions",
          type: "actions",
          headerName: "Actions",
          width: 100,
          cellClassName: "actions",
          getActions: ({ id }) => {
            if (rowModesModel[id] !== undefined) {
              const isInEditMode =
                rowModesModel[id]?.mode === GridRowModes.Edit;
              console.log("isInEditMode: " + isInEditMode);

              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: "primary.main",
                    }}
                    onClick={() => handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={() => handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
            }

            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        });

        const gridRows = sheetData.slice(1).map((row, rowIndex) => ({
          id: rowIndex,
          editale: true,
          ...row.reduce((acc, cell, cellIndex) => {
            acc[`col${cellIndex + 1}`] = cell;
            return acc;
          }, {}),
        }));

        setColumns(gridColumns);
        setRows(gridRows);
        let rowsModeTemp = [];

        for (let i = 0; i < gridRows.length; i++) {
          rowsModeTemp.push({ mode: GridRowModes.View });
        }

        setRowMode(rowsModeTemp);
        console.log(rowsModeTemp);
      };

      reader.readAsArrayBuffer(file);
    }
    ;
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
