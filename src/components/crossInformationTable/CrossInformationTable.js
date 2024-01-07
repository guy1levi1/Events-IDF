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
import ExcelReader from "../tableEditing/ExcelReader";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import "./CrossInformationTable.css";
import { Link, useLocation } from "react-router-dom";
import { useFilename } from "../tableEditing/FilenameContext";
import * as XLSX from "xlsx";
import generateGuid from "../../utils/GenereateUUID";

function CustomToolbar(props) {
  return (
    <>
      <GridToolbarContainer
        style={{
          direction: "rtl",
          marginTop: "0.5vh",
          justifyContent: "space-between",
        }}
      >
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
            // InputProps={{ disableUnderline: true }} // משאיר במידה ונרצה בעתיד להוריד את הקו שנדע כבר
            placeholder="חיפוש"
            style={{
              marginRight: "36rem",
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

const eventTableFromDB = [
  {
    eventId: "3",
    sertialNumber: 1,
    privateNumber: "010",
    firstName: "מאיר",
    lastName: "גולן",
    command: "מרכז",
    division: "1",
    unit: "10",
    rank: 'סא"ל',
    appointmentRank: "טקסט",
    appointmentLetter: "מלל",
    reasonNonArrival: "הבן לא מרגיש טוב",
    status: "ממתין להחלטת רמח",
    id: "C9B53B35-51A1-0F1E-F6B5-EEB961CA26D7",
  },
  {
    eventId: "3",
    sertialNumber: 2,
    privateNumber: "020",
    firstName: "ליאור ",
    lastName: "מרכז",
    command: "צפון",
    division: "2",
    unit: "20",
    rank: 'רס"ר',
    appointmentRank: "טקסט1",
    appointmentLetter: "מלל1",
    reasonNonArrival: 'חו"ל',
    status: "מאושר",
    id: "B606596B-F1B6-189C-F4F1-0FB9BF1A129B",
  },
  {
    eventId: "3",
    sertialNumber: 3,
    privateNumber: "030",
    firstName: "עידן",
    lastName: "עמדי",
    command: "דרום",
    division: "5",
    unit: "50",
    rank: 'רנ"ג',
    appointmentRank: "טקסט2",
    appointmentLetter: "מלל2",
    reasonNonArrival: 'חו"ל',
    status: "מאושר",
    id: "D84C70DC-94BD-F8B5-C847-BE5482C6E585",
  },
  {
    eventId: "3",
    sertialNumber: 4,
    privateNumber: "040",
    firstName: "נתן",
    lastName: "גושן",
    command: 'פקע"ר',
    division: "3",
    unit: "30",
    rank: 'סמ"ר',
    appointmentRank: "טקסט3",
    appointmentLetter: "מלל3",
    reasonNonArrival: "תקופת אבל",
    status: "מאושר",
    id: "FF95B9B2-ACA3-1ECE-93FF-EE81041A5814",
  },
  {
    eventId: "3",
    sertialNumber: 5,
    privateNumber: "050",
    firstName: "רונן",
    lastName: "המותג",
    command: 'פקע"ר',
    division: "3",
    unit: "33",
    rank: 'תא"ל',
    appointmentRank: "טקסט4",
    appointmentLetter: "מלל4",
    reasonNonArrival: "מבחן בתואר",
    status: "מאושר",
    id: "735021A2-3024-2E5F-2C80-7CDAED88E446",
  },
  {
    eventId: "3",
    sertialNumber: 6,
    privateNumber: "060",
    firstName: "אלעד",
    lastName: "כהן",
    command: "צפון",
    division: "2",
    unit: "20",
    rank: 'אל"מ',
    appointmentRank: "טקסט5",
    appointmentLetter: "מלל5",
    reasonNonArrival: "נלחם בעזה",
    status: "מאושר",
    id: "D00D71D9-5F31-C39C-A2EA-632FBA1C2639",
  },
  {
    eventId: "3",
    sertialNumber: 7,
    privateNumber: "070",
    firstName: "אודיה",
    lastName: "לוי",
    command: "דרום",
    division: "5",
    unit: "51",
    rank: "סרן",
    appointmentRank: "טקסט6",
    appointmentLetter: "מלל6",
    reasonNonArrival: "ברית לילד",
    status: "מאושר",
    id: "676D8835-7E25-F84B-F1A5-549E4B0AF6EA",
  },
  {
    eventId: "3",
    sertialNumber: 8,
    privateNumber: "080",
    firstName: "אושר",
    lastName: "ישראלי",
    command: "תקשוב",
    division: "6",
    unit: "66",
    rank: 'רס"ב',
    appointmentRank: "טקסט7",
    appointmentLetter: "מלל7",
    reasonNonArrival: "אשתו יולדת",
    status: "נדחה",
    id: "687000A4-1628-DB1B-0E41-022C44A281D6",
  },
  {
    eventId: "3",
    sertialNumber: 9,
    privateNumber: "090",
    firstName: "מתן",
    lastName: "שמעוני",
    command: "מרכז",
    division: "7",
    unit: "70",
    rank: 'רס"מ',
    appointmentRank: "טקסט8",
    appointmentLetter: "מלל8",
    reasonNonArrival: "אין לי כוח",
    status: "נדחה",
    id: "2F3F24D8-05C5-F045-89B0-897170170AA5",
  },
  {
    eventId: "3",
    sertialNumber: 10,
    privateNumber: "0100",
    firstName: "אור",
    lastName: "אביב",
    command: "מרכז",
    division: "7",
    unit: "70",
    rank: 'סא"ל',
    appointmentRank: "טקסט9",
    appointmentLetter: "מלל9",
    reasonNonArrival: "חולה",
    status: "נדחה",
    id: "4002C2F9-164C-2630-A951-12CA6CE4D8AA",
  },
];

const headers = [
  "sertialNumber",
  "privateNumber",
  "firstName",
  "lastName",
  "present",
];

function calculateNewColumn(status, excelColumnValue) {
  if (status === "pending") {
    return "חריג";
  } else if (status === "declined" && excelColumnValue === "לא") {
    return "לא";
  } else {
    return "כן";
  }
}

export default function CrossInformationTable() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const eventId = 1;
  const { filename } = useFilename();
  const location = useLocation();

  const data = location.state.presentRows;

  const mapKeys = (data, headers, eventId) => {
    return data.map((item) => {
      const newItem = { eventId: eventId };
      headers.forEach((key, index) => {
        newItem[key] = item[index];
      });
      return newItem;
    });
  };

  const transformedData = mapKeys(data, headers, eventId);

  const transformedDataMap = new Map(
    transformedData.map((item) => [item.privateNumber, item])
  );
  const mergedArray = eventTableFromDB.map((item) => ({
    ...item,
    ...transformedDataMap.get(item.privateNumber),
  }));

  React.useEffect(() => {
    setRows(
      mergedArray.map((row) => {
        // return { ...row, id: generateGuid() };
        return { ...row };

      })
    );
  }, [setRows, mergedArray]);

  React.useEffect(() => {
    console.log("filename: " + filename);

    return () => {
      // Cleanup code (if needed)
    };
  }, [filename]);



  const getStatusCellStyle = (status) => {
    let backgroundColor, textColor;

    switch (status) {
      case "מאושר":
        backgroundColor = "#32c55f";
        textColor = "white";
        break;
      case "נדחה":
        backgroundColor = "#fd3535";
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
        backgroundColorPresents = "#32c55f";
        textColorPresents = "white";
        break;
      case "לא":
        backgroundColorPresents = "#fd3535";
        textColorPresents = "white";
        break;
      case "חריג":
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

  const handleCancelButtonClick = () => {
    console.log("cancel table clicked");
  };

  const clamp = (min, value, max) => {
    return `clamp(${min}, ${value}, ${max})`;
  };

  const columns = [
    {
      field: "sertialNumber",
      headerName: `מס"ד`,
      headerAlign: "center",
      type: "number",
      editable: false,
      // flex: 1,
    },
    {
      field: "privateNumber",
      headerName: "מספר אישי",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.4,
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.6,
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.6,
    },
    {
      field: "command",
      headerName: "פיקוד",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.4,
    },
    {
      field: "division",
      headerName: "אוגדה",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1,
    },
    {
      field: "unit",
      headerName: "יחידה",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1,
    },
    {
      field: "rank",
      headerName: "דרגה",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1,
    },
    {
      field: "appointmentRank",
      headerName: "דרגת מינוי",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.9,
    },
    {
      field: "appointmentLetter",
      headerName: "מלל מינוי",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 1.4,
    },
    {
      field: "reasonNonArrival",
      headerName: "סיבת אי הגעה",
      headerAlign: "center",
      type: "string",
      editable: false,
      // flex: 2,
    },
    {
      field: "status",
      headerName: "אישור רמח",
      headerAlign: "center",
      editable: false,
      // flex: 2.5,
      // should be taken from db instead of hard coded
      renderCell: (params) => (
        <div style={getStatusCellStyle(params.value)}>{params.value}</div>
      ),
    },
    {
      field: "present",
      headerName: "נוכחות באירוע",
      headerAlign: "center",
      editable: false,
      // flex: 1.8,
      renderCell: (params) => (
        <div style={getPresentsCellStyle(params.value)}>{params.value} </div>
      ),
    },
    {
      field: "13",
      headerName: "עמידה בפקודה",
      headerAlign: "center",
      editable: false,
      width: 120,
      // flex: 2,
      // should be a calculated field  if !field: "11" && !field: "12" return לא else כן (case "ממתין להחלטת רצח" should be a case to)
      renderCell: (params) => (
        <div style={getPresentsCellStyle(params.value)}>{params.value} </div>
      ),
    },
  ];

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <h1 style={{ marginTop: "0" }}>
        פריסת שחרור לאור, תל השומר מקל”ר, 10:00 13.12.23
      </h1>
      {/* h1 will be get from lst page (create new event/edit an exisiting) */}

      <Box
        sx={{
          width: "75vw",
          height: "73vh",
          maxHeight: "80rem",
          direction: "ltr",
          background: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "2rem",
          border: 0,
          boxShadow: "5px 5px 31px 5px rgba(0, 0, 0, 0.75)",

          "& .MuiDataGrid-root": {
            border: "none",
          },

          "& .MuiDataGrid-cellContent": {
            fontSize: `${clamp("0.3rem", "calc(0.3rem + 0.75vw)", "1.5rem")}`,
          },
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
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: CustomToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              // flex: 1,
              marginTop: "0.7rem",
              textAlign: "center",
            }}
          >
            <ExcelReader
              onRowsChange={handleRowsChange}
              isCrossInformationTable={true}
              eventId={eventId}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "0.7rem",
              right: 0,
            }}
          >
            <Link
              to="/manageEventes"
              style={{ color: "white", textDecoration: "none" }}
            >
              <button
                onClick={handleCancelButtonClick}
                className="CancelCrossInformation"
                style={{
                  marginRight: "0.5rem",
                }}
              >
                חזרה
              </button>
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
}
