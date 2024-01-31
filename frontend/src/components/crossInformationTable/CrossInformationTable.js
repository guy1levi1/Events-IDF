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
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import "./CrossInformationTable.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useFilename } from "../../utils/contexts/FilenameContext";
import * as XLSX from "xlsx";
import { useRef } from "react";
import { useState } from "react";
import { getEventRequestsByEventId } from "../../utils/api/eventRequestsApi";

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

const headers = ["privateNumber", "fullname"];

function calculateComplianceOrder(status, present) {
  if (status === `pending`) {
    return "חריג";
  } else if (status === "declined" && present === "לא") {
    return "לא";
  } else {
    return "כן";
  }
}

export default function CrossInformationTable() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const { filename, setFilename } = useFilename();
  const [uploadFileInfo, setUploadFileInfo] = useState(
    filename != null ? `הועלה ${filename} קובץ` : ""
  );
  const location = useLocation();

  const { eventId } = useParams();

  const [data, setData] = useState(location.state.presentRows);
  const eventName = location.state.eventName;
  const eventDate = location.state.eventDate;
  const eventLocation = location.state.eventLocation;
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
  }, []);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRequestsData = await getEventRequestsByEventId(eventId);

        // Merge data here after fetching event requests
        const mergedArray = eventRequestsData.map((item2) => {
          const matchingItem = transformedData.find(
            (item1) => item1.privateNumber === item2.privateNumber
          );

          if (matchingItem) {
            // Update the "present" field if a match is found
            return { ...item2, present: "כן" };
          } else {
            // Set "לא" if there is no match
            return { ...item2, present: "לא" };
          }
        });

        setRows(
          mergedArray.map((row) => {
            const complianceOrder = calculateComplianceOrder(
              row.status,
              row.present
            );
            return { ...row, complianceOrder };
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error getting event requests:", error);
      }
    };

    const initializePage = async () => {
      await fetchData();
    };

    initializePage();
  }, [filename, eventId, transformedData]);

  // this code is for upload a new present list in crossInformation page

  const fileInputRef = useRef(null);

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
                ...row,
              };
              return newRow;
            });
  
          setData(newRows);
        };
  
        reader.readAsBinaryString(file);
      } else {
        console.error("Invalid file type");
        throw new Error(
          "Invalid file type. Please upload a valid Excel file (xlsx or xls)."
        );
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const getStatusCellStyle = (status) => {
    let backgroundColor, textColor;

    switch (status) {
      case "approved":
        backgroundColor = "#32c55f";
        textColor = "white";
        break;
      case "declined":
        backgroundColor = "#fd3535";
        textColor = "white";
        break;
      case "pending":
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
    setFilename("");
  };

  const clamp = (min, value, max) => {
    return `clamp(${min}, ${value}, ${max})`;
  };

  const columns = [
    {
      field: "serialNumber",
      headerName: `מס"ד`,
      headerAlign: "center",
      type: "number",
      editable: false,
      width: 60,
    },
    {
      field: "privateNumber",
      headerName: "מספר אישי",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "command",
      headerName: "פיקוד",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "division",
      headerName: "אוגדה",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "unit",
      headerName: "יחידה",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "rank",
      headerName: "דרגה",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "appointmentRank",
      headerName: "דרגת מינוי",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "appointmentLetter",
      headerName: "מלל מינוי",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "reasonNonArrival",
      headerName: "סיבת אי הגעה",
      headerAlign: "center",
      type: "string",
      editable: false,
    },
    {
      field: "status",
      headerName: "אישור רמח",
      headerAlign: "center",
      editable: false,
      width: 150,
      renderCell: (params) => (
        <div style={getStatusCellStyle(params.value)}>
          {params.value === "pending"
            ? "ממתין להחלטת רמח"
            : params.value === "approved"
            ? "מאושר"
            : "נדחה"}
        </div>
      ),
    },

    {
      field: "present",
      headerName: "נוכחות באירוע",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <div style={getPresentsCellStyle(params.value)}>{params.value} </div>
      ),
    },
    {
      field: "complianceOrder",
      headerName: "עמידה בפקודה",
      headerAlign: "center",
      editable: false,
      width: 120,
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
      <h1 style={{ marginTop: "1rem" }}>
        {eventName && eventLocation && eventDate
          ? `${eventName}, ${eventLocation}, ${eventDate}`
          : eventName && eventDate
          ? `${eventName}, ${eventDate}`
          : eventLocation && eventDate
          ? `${eventLocation}, ${eventDate}`
          : eventDate}
      </h1>
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
          loading={loading}
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
              marginTop: "0.7rem",
              textAlign: "center",
            }}
          >
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
                להעלאת טופס נוכחות חדש
              </button>

              <div style={{ marginTop: "-0.6rem" }}>
                {<p className="uploadFilenfo">{uploadFileInfo}</p>}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "0.7rem",
              right: 0,
            }}
          >
            <Link
              to="/manageEvents"
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
