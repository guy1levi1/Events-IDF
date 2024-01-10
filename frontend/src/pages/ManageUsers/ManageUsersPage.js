import React, { useState } from "react";
import ManageExistsUsers from "./ManageExistsUsers";
import ManageUnapprovedUsers from "./ManageUnapprovedUsers";
import generateUuid from "../../utils/GenereateUUID";
import "./ManageUsersPage.css";

export default function ManageUsersPage() {
  const [approvedUser] = useState({});

  const existUsers = useState([
    {
      id: 1,
      privateNumber: "7283947",
      fullName: "אייל אנגל",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 2,
      privateNumber: "1234567",
      fullName: "רון כרמלי",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 3,
      privateNumber: "2345678",
      fullName: "ג'ימי לאונרדו",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 4,
      privateNumber: "3456789",
      fullName: "אריאל נבון",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 5,
      privateNumber: "4567890",
      fullName: "איציק שמיר",
      command: "צפון",
      password: "password12345",
    },
    {
      id: 6,
      privateNumber: "5678901",
      fullName: "תהל לוי",
      command: "צפון",
      password: "password12345",
    },
    {
      id: 7,
      privateNumber: "6789012",
      fullName: "נועה כהן",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 8,
      privateNumber: "7890123",
      fullName: "גיא צוק",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 9,
      privateNumber: "8901234",
      fullName: "אור מילואימניק",
      command: "דרום",
      password: "password12345",
    },
  ]);

  const updateApprovedUser = (newApprovedUser) => {
    const [rows, setRows] = existUsers;
    setRows([{ ...newApprovedUser, id: generateUuid() }, ...rows]);
    console.log("New Data in Parent Component:", {
      ...newApprovedUser,
      id: generateUuid(),
    });
  };

  return (
    <div
      className="ManageUserPage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <h1>ניהול משתמשים</h1>

      <div
        className="tablesManageUsers"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className="existUsersTable"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h3>משתמשים קיימים</h3>

          <ManageExistsUsers existUsers={existUsers}></ManageExistsUsers>
        </div>
        <div
          className="waitingForBeingApprovedUsersTable"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h3>משתמשים שממתינים לאישור</h3>

          <ManageUnapprovedUsers
            approvedUser={approvedUser}
            updateApprovedUser={updateApprovedUser}
          ></ManageUnapprovedUsers>
        </div>
      </div>
    </div>
  );
}
