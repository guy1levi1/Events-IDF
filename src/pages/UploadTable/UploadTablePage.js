import React from "react";
import Box from "@mui/material/Box";
import "./UploadTablePage.css";

export default function UploadTablePage() {
  const handleButtonClick = () => {
    console.log("first");
  };

  const handleCancelButtonClick = () => {
    console.log("cancel table clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "35rem",
          width: "70rem",
          background: "#CCCBCB",
          borderRadius: "1rem",
          direction: "rtl",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", margin: "auto" }}>
          <button onClick={handleButtonClick} className="rounded-button">
            העלה/י קובץ
          </button>

          <button
            onClick={handleCancelButtonClick}
            className="roundedButton"
            style={{
              backgroundColor: "#F94A4A",
              marginLeft: "60rem",
            }}
          >
            בטל
          </button>
        </div>
      </Box>
    </div>
  );
}
