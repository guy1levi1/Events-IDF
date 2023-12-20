import React from "react";
import { Outlet } from "react-router-dom";
import "./RootLayOut.css";
import Menu from "../../components/sideBar/Menu";
import mekalarLogo from "../../images/mekalar.png";
import logiCorpLogo from "../../images/logi_corp.png";
export default function RootLayout({ children }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "rgba(98, 144, 212, 1)",
        }}
      >
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

        <div style={{ position: "absolute", bottom: "0", left: "1rem" }}>
          <h5 style={{ color: "rgba(225,225,225,0.8)" }}>
            פותח ע”י בית התוכנה - חיל הלוגיסטיקה
          </h5>
        </div>
      </div>
    </>
  );
}
