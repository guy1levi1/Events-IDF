import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { heIL } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ExcelReader from "../../components/tableEditing/ExcelReader";
import { randomId } from "@mui/x-data-grid-generator";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridRowEditStopReasons } from "@mui/x-data-grid";

function CustomToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{
          "& .MuiButton-startIcon": {
            marginLeft: "-85px",
          },
        }}
        style={{
          borderRadius: "10px",
          border: "10px red",
          direction: "rtl",
          color: "#3069BE",
        }}
      >
        הוסף שורה
      </Button>
      <GridToolbarContainer
        style={{
          direction: "rtl",
          marginTop: "0.5vh",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div>
          <GridToolbarColumnsButton
            sx={{
              "& .MuiButton-startIcon": {
                marginLeft: "2px",
                color: "#3069BE",
              },
            }}
          />
          <GridToolbarFilterButton
            sx={{
              "& .MuiButton-startIcon": {
                marginLeft: "2px",
                color: "#3069BE",
              },
            }}
          />
          <GridToolbarDensitySelector
            sx={{
              "& .MuiButton-startIcon": {
                marginLeft: "2px",
                color: "#3069BE",
              },
            }}
          />
          <GridToolbarExport
            sx={{
              "& .MuiButton-startIcon": {
                marginLeft: "2px",
                color: "#3069BE",
              },
            }}
          />
        </div>
        <div>
          <GridToolbarQuickFilter
            placeholder="חיפוש"
            style={{
              marginRight: "563px",
            }}
            sx={{
              "& .MuiInputBase-root": {
                width: "87%",
                height: "28px",
                direction: "rtl",
              },
              "& .MuiSvgIcon-root": {
                display: "none",
              },
            }}
          />
        </div>
      </GridToolbarContainer>
    </>
  );
}

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export default function CustomToolbarGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleRowsChange = (newRows) => {
    setRows(newRows);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getStatusCellStyle = (status) => {
    let backgroundColor, textColor;

    switch (status) {
      case "מאושר":
        backgroundColor = "#05bf3e";
        textColor = "white";
        break;
      case "נדחה":
        backgroundColor = "#ff0000";
        textColor = "white";
        break;
      case "ממתין להחלטת רמח":
        backgroundColor = "#ffa200";
        textColor = "black";
        break;
      default:
        backgroundColor = "#ffa200";
        textColor = "black";
        break;
    }

    return {
      backgroundColor,
      color: textColor,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const getPresentsCellStyle = (value) => {
    let backgroundColorPresents, textColorPresents;

    switch (value) {
      case "כן":
        backgroundColorPresents = "#05bf3e";
        textColorPresents = "white";
        break;
      case "לא":
        backgroundColorPresents = "#ff0000";
        textColorPresents = "white";
        break;
      case "ממתין להחלטת רמח":
        backgroundColorPresents = "#ffa200";
        textColorPresents = "black";
        break;
      default:
        backgroundColorPresents = "#ffa200";
        textColorPresents = "black";
        break;
    }

    return {
      backgroundColor: backgroundColorPresents,
      color: textColorPresents,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const columns = [
    {
      field: "0",
      headerName: `מס"ד`,
      headerAlign: "center",
        
      type: "number",
      width: 50,
      editable: false,
    },
    {
      field: "1",
      headerName: "מספר אישי",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "2",
      headerName: "שם פרטי",
      headerAlign: "center",
        
      type: "string",
      width: 100,
      editable: false,
    },
    {
      field: "3",
      headerName: "שם משפחה",
      headerAlign: "center",
        
      type: "string",
      width: 100,
      editable: false,
    },
    {
      field: "4",
      headerName: "פיקוד",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "5",
      headerName: "אוגדה",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "6",
      headerName: "יחידה",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "7",
      headerName: "דרגה",
      headerAlign: "center",
        
      type: "string",
      width: 50,
      editable: false,
    },
    {
      field: "8",
      headerName: "דרגת מינוי",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "9",
      headerName: "מלל מינוי",
      headerAlign: "center",
        
      type: "string",
      width: 80,
      editable: false,
    },
    {
      field: "10",
      headerName: "סיבת אי הגעה",
      headerAlign: "center",
        
      type: "string",
      width: 130,
      editable: false,
    },
    {
      field: "11",
      headerName: "אישור רמח",
      headerAlign: "center",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div style={getStatusCellStyle(params.value)}>
          {params.value === "מאושר" && "מאושר"}
          {params.value === "נדחה" && "נדחה"}
          {params.value === "ממתין להחלטת רמח" && "ממתין להחלטת רמח"}
        </div>
      ),
    },
    {
      field: "12",
      headerName: "נוכחות באירוע",
      headerAlign: "center",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div style={getPresentsCellStyle(params.value)}>
          {params.value === "כן" && "כן"}
          {params.value === "לא" && "לא"}
          {params.value === "ממתין להחלטת רמח" && "ממתין להחלטת רמח"}
        </div>
      ),
    },
    {
      field: "13",
      headerName: "עמידה בפקודה",
      headerAlign: "center",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div style={getPresentsCellStyle(params.value)}>
          {params.value === "כן" && "כן"}
          {params.value === "לא" && "לא"}
          {params.value === "ממתין להחלטת רמח" && "ממתין להחלטת רמח"}
        </div>
      ),
    },
  ];

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        marginTop: "40px",
        background: "#BAB9B9",
      }}
    >
      <Box
        sx={{
          height: 700,
          width: 1220,
          direction: "ltr",
          background: "white",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            direction: "rtl",
            "& .MuiDataGrid-virtualScroller": {
              overflow: "unset !important",
              mt: "0 !important",
            },

            "& .MuiDataGrid-columnHeaders": {
              overflow: "unset",
              position: "sticky",
              left: 1,
              zIndex: 1,
              top: 0,
            },
            "& .MuiDataGrid-columnHeadersInner > div": {
              direction: "rtl !important",
            },
            "& .MuiDataGrid-main": {
              overflow: "auto",
            },
            "& .MuiTablePagination-actions": {
              direction: "ltr",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EDF3F8",
            },
            "& .MuiButton-textSizeSmall": {
              color: "#3069BE",
            },
            "& .MuiDataGrid-columnHeadersInner": {
              bgcolor: "#3069BE",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              color: "white",
            },
          }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          pageSizeOptions={[5, 10, 25]}
          pagination
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
        <ExcelReader
          onRowsChange={handleRowsChange}
          isCrossInformationTable={false}
        />
      </Box>
    </div>
  );
}
