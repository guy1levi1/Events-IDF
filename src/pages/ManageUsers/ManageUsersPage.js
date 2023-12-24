import React, { useState } from "react";
import ManageExistsUsers from "./ManageExistsUsers";
import ManageUnapprovedUsers from "./ManageUnapprovedUsers";
import generateUuid from "../../utils/GenereateUUID";

export default function ManageUsersPage() {
  const [approvedUser] = useState({}); // State to hold the JSON object

  const rowsState = useState([
    {
      id: 1,
      privateNumber: "7283947",
      lastName: "אנגל",
      firstName: "אייל",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 2,
      privateNumber: "1234567",
      lastName: "כרמלי",
      firstName: "רון",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 3,
      privateNumber: "2345678",
      lastName: "לאונרדו",
      firstName: "ג'ימי",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 4,
      privateNumber: "3456789",
      lastName: "נבון",
      firstName: "אריאל",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 5,
      privateNumber: "4567890",
      lastName: "שמיר",
      firstName: "איציק",
      command: "צפון",
      password: "password12345",
    },
    {
      id: 6,
      privateNumber: "5678901",
      lastName: "לוי",
      firstName: "תהל",
      command: "צפון",
      password: "password12345",
    },
    {
      id: 7,
      privateNumber: "6789012",
      lastName: "כהן",
      firstName: "נועה",
      command: 'פקע"ר',
      password: "password12345",
    },
    {
      id: 8,
      privateNumber: "7890123",
      lastName: "צוק",
      firstName: "גיא",
      command: "מרכז",
      password: "password12345",
    },
    {
      id: 9,
      privateNumber: "8901234",
      lastName: "מילואימניק",
      firstName: "אור",
      command: "דרום",
      password: "password12345",
    },
  ]);

  const updateApprovedUser = (newApprovedUser) => {
    const [rows, setRows] = rowsState;
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
      }}
    >
      <ManageExistsUsers rowsState={rowsState}></ManageExistsUsers>
      <ManageUnapprovedUsers
        approvedUser={approvedUser}
        updateApprovedUser={updateApprovedUser}
      ></ManageUnapprovedUsers>
    </div>
  );
}
