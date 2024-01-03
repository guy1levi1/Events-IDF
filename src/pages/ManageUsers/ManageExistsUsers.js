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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

function CustomToolbar(props) {
  return (
    <>
      <GridToolbarContainer
        style={{
          direction: "rtl",
          marginTop: "0.5vh",
          marginRight: "0.5vw",

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
              marginRight: "1rem",
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

export default function ManageExistsUsers({ newApprovedUser, rowsState }) {
  const [rows, setRows] = rowsState;
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    // This will run whenever data prop changes
    console.log("Data in Child2:", newApprovedUser);
  }, [newApprovedUser]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
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

  const columns = [
    {
      field: "privateNumber",
      headerName: "מספר אישי",
      headerAlign: "center",
       
      type: "string",
      // width: 80,
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      headerAlign: "center",
       
      type: "string",
      // width: 80,
      editable: true,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      headerAlign: "center",
       
      type: "string",
      // width: 80,
      editable: true,
      flex: 1,
    },

    {
      field: "command",
      headerName: "פיקוד",
      headerAlign: "center",
       
      type: "string",
      // width: 80,
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "פעולות",
      headerAlign: "center",
      // width: 100,
      flex: 1,

      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            sx={{ color: "#FC0" }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: "#fd3535" }}
          />,
        ];
      },
    },
  ];

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        margin: "1rem",
      }}
    >
      <Box
        sx={{
          // height: "32rem",
          // width: "27rem",
          width: "35vw",
          height: "70vh",
          maxHeight: "40rem",
          maxWidth: "40rem",
          "@media screen and (max-width: 1200px)": {
            width: "50vw",
            height: "70vh",
            maxHeight: "40rem",
            maxWidth: "60rem",
          },
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
              // overflow: "unset !important",
              mt: "0 !important",
            },

            "& .MuiDataGrid-columnHeaders": {
              overflow: "unset",
              position: "sticky !important",
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
          pagination
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
              flex: 1,
              marginTop: "0.7rem",
              textAlign: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              marginTop: "0.7rem",
              right: 0,
            }}
          ></div>
        </div>
      </Box>
    </div>
  );
}
