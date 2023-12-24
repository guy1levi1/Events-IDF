import { Box } from "@mui/material";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CompareIcon from "../../images/compareIcon.png";
import DeleteIcon from "../../images/DeleteIcon.png";
import EditTextsIcon from "../../images/EditTextsIcon.png";
import TableModeIcon from "../../images/tableModeIcon.png";
import ExcelReader from "../../components/tableEditing/ExcelReader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CardEvent({
  eventName,
  eventDatetime,
  eventPlace,
  eventDescription,
  eventCreator,
}) {
  const handleClickDeleteButton = () => {
    Swal.fire({
      title: "האם את/ה בטוח/ה שתרצה/י למחוק את האירוע  {שם האירוע}",
      text: "פעולה זאת איננה ניתנת לשחזור",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "מחק אירוע",
      cancelButtonText: "בטל",
      reverseButtons: true, // Set reverseButtons to true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete the event from db and update in the fronted
        Swal.fire({
          title: "נמחק בהצלחה!",
          text: "האירוע {שם האירוע} נמחק בהצלחה.",
          icon: "success",
          confirmButtonText: "אישור",
        });
      }
    });
  };

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("File uploaded!");
      navigate("/crossInformation");

      // You can do additional processing with the file if needed
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
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
            {/* need to send him with props of the current fields from db and merge it with the new file */}
            {/* will be crossInformatio/:eventId */}
            {/* <Link
              to="/crossInformation"
              style={{ color: "white", textDecoration: "none" }}
            > */}
            {/* <ExcelReader
                onRowsChange={null}
                isCrossInformationTable={false}
                imageSrc={CompareIcon}
              /> */}
            {/* <img
                src={CompareIcon}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.5rem",
                  cursor: "pointer",
                }}
              /> */}
            {/* </Link> */}
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button onClick={handleButtonClick}>Upload File</button>
            </div>
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
              {/* need to send him with props of the current fields from db */}
              {/* will be table/:eventId */}
              <Link
                to="/table"
                style={{ color: "white", textDecoration: "none" }}
              >
                <img
                  src={TableModeIcon}
                  alt=""
                  style={{
                    width: "3.268rem",
                    height: "3.5rem",
                    cursor: "pointer",
                  }}
                />
              </Link>
              {/* need to send him to new page call editEvent with props of the current fields from db */}
              {/* will be editEvent/:eventId */}
              <Link
                to="/createEvent"
                style={{ color: "white", textDecoration: "none" }}
              >
                <img
                  src={EditTextsIcon}
                  alt=""
                  style={{
                    width: "3.268rem",
                    height: "3.5rem",
                    cursor: "pointer",
                  }}
                />
              </Link>
              <img
                src={DeleteIcon}
                onClick={handleClickDeleteButton}
                alt=""
                style={{
                  width: "3.268rem",
                  height: "3.6rem",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
