import React, { useContext, useEffect, useState } from "react";
import "./Menu.css";
import profile_img from "../../images/logo_image_example.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/authContext";
import {
  getCommandNameByUserId,
  getFullNameById,
} from "../../utils/api/usersApi";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loggedUserId = userData ? userData.userId : "";
  const [loggedUserFullName, setLoggedUserFullName] = useState("");
  const [loggedUserCommand, setLoggedUserCommand] = useState("");

  const toggleMenu = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setActiveLink(getRouteIndex(location.pathname));
  }, [location]);

  let linksArray;

  if (auth.isLoggedIn && loggedUserCommand === "סגל") {
    linksArray = [
      { name: "אודות המערכת", url: "/about" },
      { name: "ניהול אירועים", url: "/manageEventes" },
      { name: "יצירת אירוע", url: "/createEvent" },
      { name: "ניהול משתמשים", url: "/manageUsers" },
    ];
  } else if (auth.isLoggedIn) {
    linksArray = [
      { name: "אודות המערכת", url: "/about" },
      { name: "ניהול אירועים", url: "/manageEventes" },
    ];
  } else {
    linksArray = [{ name: "אודות המערכת", url: "/about" }];
  }

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
    setActiveLink(index);
    navigate(url);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const fullName = await getFullNameById(loggedUserId);
        const command = await getCommandNameByUserId(loggedUserId);
        setLoggedUserFullName(fullName);
        setLoggedUserCommand(command);
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    fetchFullName();
  }, [loggedUserId, getFullNameById]);

  return (
    <div>
      <div className={open ? "menu-wrapper menu-open" : "menu-wrapper"}>
        <div
          className="headerSideBar"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // paddingTop: "1vh"
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
              {loggedUserFullName}
            </h3>
            {loggedUserCommand ? (
              <h6 className="CommandMenu" style={{ padding: 0, margin: 0 }}>
                פיקוד {loggedUserCommand}
              </h6>
            ) : (
              <div></div> // You can replace this with any content or leave it empty
            )}
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
            onClick={handleLogout}
            style={{
              display: "flex",
              marginRight: "0.6rem",
              position: "absolute",
              bottom: 0,
              marginBottom: "0.5rem",
              color: "black",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            התנתק/י
          </a>
        ) : (
          <a
            className="signoutbutton"
            onClick={handleLogin}
            style={{
              display: "flex",
              marginRight: "0.6rem",
              position: "absolute",
              bottom: 0,
              marginBottom: "0.5rem",
              color: "black",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            // href={`/login`}
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
