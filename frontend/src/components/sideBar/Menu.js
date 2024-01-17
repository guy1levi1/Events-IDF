import React, { useContext, useState } from "react";
import "./Menu.css";
import profile_img from "../../images/logo_image_example.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/authContext";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const toggleMenu = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    console.log("Current URL:", location.pathname);
    setActiveLink(getRouteIndex(location.pathname));
  }, [location]);

  const linksArray = auth.isLoggedIn
    ? [
        { name: "אודות המערכת", url: "/about" },
        { name: "ניהול אירועים", url: "/manageEventes" },
        { name: "יצירת אירוע", url: "/createEvent" },
        { name: "ניהול משתמשים", url: "/manageUsers" },
      ]
    : [{ name: "אודות המערכת", url: "/about" }];

  const getRouteIndex = (pathname) => {
    if (pathname === "/about") {
      return 0;
    } else if (pathname === "/manageEventes") {
      return 1;
    } else if (pathname === "/createEvent") {
      return 2;
    } else if (pathname === "/manageUsers") {
      return 3;
    } else {
      return -1;
    }
  };

  const navigateHandler = (url, index) => {
    console.log("index: " + index);
    setActiveLink(index);
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
          <img className="profileImage" src={profile_img} alt="progile_logo" />
          <div
            className="FullNameAndPukid"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "2vh",
              marginRight: "0.5vw",
              paddingBottom: "0.5vh",
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
                style={{
                  fontSize: ["small", "medium", "large", "large", "x-large"],
                }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        {auth.isLoggedIn ? (
          <a
            className="signoutbutton"
            onClick={auth.logout}
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
          >
            התנתק/י
          </a>
        ) : (
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
          >
            התחבר/י
          </a>
        )}
      </div>
      <button
        className={open ? "menu-toggle close-button" : "menu-toggle"}
        onClick={toggleMenu}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1.2rem",
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
