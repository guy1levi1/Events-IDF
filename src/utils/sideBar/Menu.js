import React, { useState } from "react";
import "./Menu.css"; // Import your CSS file
import profile_img from "../../images/logo_image_example.png";
import { useNavigate } from "react-router";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const linksArray = [
    { name: "אודות המערכת", url: "/about" },
    { name: "ניהול אירועים", url: "/manageEventes" },
    { name: "יצירת אירוע", url: "/createEvent" },
  ];

  const navigateHandler = (url) => {
    // <Navigate to="/dashboard" replace={true} />
    navigate(url);
  };

  return (
    <div>
      <div className={open ? "menu-wrapper menu-open" : "menu-wrapper"}>
        <div
          className="headerSideBar"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={profile_img}
            alt="progile_logo"
            style={{
              width: "60px",
              maxWidth: "60px",
              marginTop: "20px",
              marginRight: "10px",
            }}
          />
          <div
            className="FullNameAndPukid"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              marginRight: "5px",
            }}
          >
            <h3 style={{ padding: 0, margin: 0 }}>אייל אנגל</h3>
            <h6 style={{ padding: 0, margin: 0 }}> פיקוד מרכז</h6>
          </div>
        </div>

        <div
          className={
            open ? "links-wrapper" : "links-wrapper links-wrapper-closed"
          }
        >
          <ul className="link-list">
            {linksArray.map((link, index) => (
              <li
                key={index}
                className="link"
                onClick={() => navigateHandler(link.url)}
                style={{ fontSize: "1rem" }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        <a
        className="signoutbutton"
          style={{
            display: "flex",
            marginRight: "10px",
            position: "absolute",
            bottom: 0,
            marginBottom: "0.5rem",
            color: "black",
            cursor: "pointer"
          }}
          href={`/login`}
          >
          התנתק/י
        </a>
      </div>
      <button
        className={open ? "menu-toggle close-button" : "menu-toggle"}
        onClick={toggleMenu}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i
          className="fa"
          style={{
            fontSize: "1.75rem",
            color: "white",
            marginRight: "0.3rem",
            marginBottom: "0.15rem",
          }}
        >
          &#9776;
        </i>
      </button>
    </div>
  );
};

export default Menu;
