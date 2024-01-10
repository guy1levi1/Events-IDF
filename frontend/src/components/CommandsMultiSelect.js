import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";
import { red } from "@mui/material/colors";
// import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "53%",
      minWidth: null,
    },
    sx: {
      "& .muirtl-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
        backgroundColor: "rgba(25, 118, 210, 0.20)",
      },
    },
  },
};

const commands = ["סגל", `פקע"ר`, "דרום", "תקשוב", "מרכז", "צפון"];

function getStyles(command, commandName, theme) {
  return {
    fontWeight:
      commandName.indexOf(command) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CommandsMultiSelect({
  initialFontSize,
  formData,
  onChange,
  onBlur,
  commandsFromEdit,
  commandsFromLocalStorage,
}) {
  const theme = useTheme();
  //   const [commandName, setCommandName] = React.useState(commandsFromEdit || []);
  const [commandName, setCommandName] = React.useState(
    commandsFromLocalStorage || commandsFromEdit || []
  );
  console.log(commandsFromEdit);

  // console.log(valueFromEdit);

  // useEffect(() => {
  //   if (valueFromEdit) {
  //     setCommandName((prevCommandName) => {
  //       // Call the onChange callback with the updated state
  //       onChange({ value: valueFromEdit, id: "commandsSelector" });
  //     });
  //   }
  // }, [valueFromEdit]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Use the callback form of setCommandName to get the previous state
    setCommandName((prevCommandName) => {
      // On autofill we get a stringified value.
      const updatedCommandName =
        typeof value === "string" ? value.split(",") : value;

      // Call the onChange callback with the updated state
      onChange({ value: updatedCommandName, id: "commandsSelector" });

      // Return the updated state
      return updatedCommandName;
    });
  };

  return (
    <FormControl
      size="small"
      error={formData.initialInputs.commandsSelector.error}
      sx={{
        width: "90%",
        margin: "auto",
        mb: "0.4rem",

        "& .MuiOutlinedInput-root": {
          color: "white !important",
          borderRadius: "5000px",
          backgroundColor: !formData.initialInputs.commandsSelector.error
            ? "#8EAEDE"
            : "#d9d9d9",
        },

        "& .MuiInputLabel-root": {
          color: !formData.initialInputs.commandsSelector.error
            ? "white !important"
            : "red !important",
          backgroundColor: !formData.initialInputs.commandsSelector.error
            ? "#8EAEDE"
            : "#d9d9d9",
          borderRadius: "500px",
          px: 1,
          fontSize: `${initialFontSize}px`,
        },

        "& .muirtl-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
          backgroundColor: "red",
        },

        "& .MuiOutlinedInput-input": {
          color: !formData.initialInputs.commandsSelector.error
            ? "white !important"
            : "red !important",
          fontSize: `${initialFontSize}px`,
        },
      }}
    >
      <InputLabel id="demo-multiple-chip-label">בחר פיקודים</InputLabel>
      <Select
        sx={{
          "& ..muirtl-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
            {
              backgroundColor: red,
            },
        }}
        labelId="demo-multiple-chip-label"
        id="commandsSelector"
        multiple
        value={commandName}
        onChange={(e) => handleChange(e)}
        onBlur={() => onBlur("commandsSelector")}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              "& .MuiChip-label": { color: "white" },
            }}
          >
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {commands.map((command) => (
          <MenuItem
            key={command}
            value={command}
            style={getStyles(command, commandName, theme)}
          >
            {command}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>בחר פיקודים</FormHelperText>
    </FormControl>
  );
}
