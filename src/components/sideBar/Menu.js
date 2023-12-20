import React, { useState } from "react";
import "./Menu.css"; // Import your CSS file
import profile_img from "../../images/logo_image_example.png";
import { useNavigate } from "react-router";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null); // State to track the active link
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const linksArray = [
    { name: "אודות המערכת", url: "/about" },
    { name: "ניהול אירועים", url: "/manageEventes" },
    { name: "יצירת אירוע", url: "/createEvent" },
    { name: "ניהול משתמשים", url: "/manageUsers" },

  ];

  const navigateHandler = (url, index) => {
    setActiveLink(index); // Update the active link index
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
            // justifyContent: "center",
            // margin: "auto",
          }}
        >
          <img
            src={profile_img}
            alt="progile_logo"
            style={{
              width: "4.5rem",
              maxWidth: "4.5rem",
              marginTop: "1.2rem",
              marginRight: "0.6rem",
            }}
          />
          <div
            className="FullNameAndPukid"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1.2rem",
              marginRight: "0.3rem",
            }}
          >
            <h3 className="FullNameMenu" style={{ padding: 0, margin: 0 }}>
              אייל אנגל
            </h3>
            <h6 className="CommandMenu" style={{ padding: 0, margin: 0 }}>
              פיקוד מרכז
            </h6>
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
                className={index === activeLink ? "link active" : "link"}
                onClick={() => navigateHandler(link.url, index)}
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
            marginRight: "0.6rem",
            position: "absolute",
            bottom: 0,
            marginBottom: "0.5rem",
            color: "black",
            cursor: "pointer",
          }}
          href={`/login`}
          // href={
          //   "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
          // }
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
