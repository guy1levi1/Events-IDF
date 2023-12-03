import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../utils/sidebar/SideBar";
import { useState } from "react";
import "./RootLayOut.css";
import Menu from "../utils/codepen_sidebat/Menu"

export default function RootLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const wrapperToggle = isSidebarOpen ? "wrapper_toggle open" : "wrapper_toggle";

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };


  return (
    <>
      {/* <SideBar wrapperToggle= {wrapperToggle} isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <Outlet /> */}
      <Menu />
    </>
  );
}
