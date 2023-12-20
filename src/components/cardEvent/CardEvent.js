import { Box } from "@mui/material";
import React from "react";
import CompareIcon from "../../images/compareIcon.png";
import DeleteIcon from "../../images/DeleteIcon.png";
import EditTextsIcon from "../../images/EditTextsIcon.png";
import TableModeIcon from "../../images/tableModeIcon.png";

export default function CardEvent({
  eventName,
  eventDatetime,
  eventPlace,
  eventDescription,
  eventCreator,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          width: "30.1rem",
          height: "14.7rem",
          background: "#D9D9D9",
          borderRadius: "2rem",
          padding: 0,
          margin: 0,
        }}
      >
        <div
          className="CardTexts"
          style={{
            paddingRight: "1.3rem",
            paddingLeft: "1rem",
            paddingTop: "0.4rem",
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            height: "87%",
            maxHeight: "87%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontSize: "1.7rem", padding: 0, margin: 0 }}>
              {eventName}
            </h4>
            <img
              src={CompareIcon}
              alt=""
              style={{
                width: "3.268rem",
                height: "3.5rem",
              }}
            />
          </div>
          <h5
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              whiteSpace: "normal",
              textOverflow: "ellipsis",
              fontWeight: "normal",
              fontSize: "1.2rem",
              padding: 0,
              marginTop: "0.8rem",
              marginBottom: 0,
              height: "4.4rem",
              width: "85%",
              maxWidth: "85%",
              lineHeight: "1.4rem",
            }}
          >
            {eventDescription}
          </h5>

          <h6
            style={{
              fontWeight: "Bold",
              fontSize: "0.9rem",
              padding: 0,
              margin: 0,
              marginTop: "0.5rem",
              width: "85%",
            }}
          >
            {eventPlace} ,{eventDatetime}
          </h6>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                fontWeight: "normal",
                fontSize: "1.2rem",
                padding: 0,
                margin: "1.5rem 0px 0px",
                marginTop: "0px",
                marginBottom: "0px",
                width: "45%",
              }}
            >
              נוצר ע"י {eventCreator}
            </h5>
            <div>
              <img
                src={TableModeIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.5rem",
                }}
              />
              <img
                src={EditTextsIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.5rem",
                }}
              />
              <img
                src={DeleteIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.6rem",
                }}
              />{" "}
            </div>
          </div>
        </div>
        <div
          className="TopButton"
          style={{ position: "absolute", top: "0.5rem", left: "0.5rem" }}
        >
          {/* <img
            src={CompareIcon}
            alt=""
            style={{
              width: "3.268rem",
              height: "3.5rem",
            }}
          /> */}
        </div>
        <div
          className="ButtonsBottom"
          style={{ position: "absolute", bottom: 0, left: "0.5rem" }}
        >
          {/* <img
            src={TableModeIcon}
            alt=""
            style={{
              width: "3.268rem",
              height: "3.5rem",
            }}
          />
          <img
            src={EditTextsIcon}
            alt=""
            style={{
              width: "3.268rem",
              height: "3.5rem",
            }}
          />
          <img
            src={DeleteIcon}
            alt=""
            style={{
              width: "3.268rem",
              height: "3.6rem",
            }}
          /> */}
        </div>
      </Box>
    </div>
  );
}
