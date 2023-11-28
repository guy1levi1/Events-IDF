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