import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayOut.css";
import Menu from "../../utils/sideBar/Menu";
import mekalarLogo from "../../images/mekalar.png";
import logiCorpLogo from "../../images/logi_corp.png";

export default function RootLayout({ children }) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <img
            src={logiCorpLogo}
            alt=""
            style={{
              width: "4rem",
              height: "4rem",
            }}
          />
          <img
            src={mekalarLogo}
            alt=""
            style={{
              width: "4rem",
              height: "4rem",
            }}
          />
        </div>

        <Menu />
        <Outlet />
      </div>
    </>
  );
}
