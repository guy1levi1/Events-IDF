import React, { useEffect, useState } from "react";
import ManageExistsUsers from "./ManageExistsUsers";
import ManageUnapprovedUsers from "./ManageUnapprovedUsers";
import generateUuid from "../../utils/GenereateUUID";
import "./ManageUsersPage.css";
import { getUsers } from "../../utils/api/usersApi";
import { getUnapprovedUsers } from "../../utils/api/unapprovedUsersApi";
import { getCommandNameById } from "../../utils/api/commandsApi";

export default function ManageUsersPage() {
  const [approvedUser] = useState({});

  const existUsers = useState([
    {
      id: 1,
      privateNumber: "7283947",
      fullName: "אייל אנגל",
      command: "מרכז",
    },
    {
      id: 2,
      privateNumber: "1234567",
      fullName: "רון כרמלי",
      command: "מרכז",
    },
    {
      id: 3,
      privateNumber: "2345678",
      fullName: "ג'ימי לאונרדו",
      command: 'פקע"ר',
    },
    {
      id: 4,
      privateNumber: "3456789",
      fullName: "אריאל נבון",
      command: 'פקע"ר',
    },
    {
      id: 5,
      privateNumber: "4567890",
      fullName: "איציק שמיר",
      command: "צפון",
    },
    {
      id: 6,
      privateNumber: "5678901",
      fullName: "תהל לוי",
      command: "צפון",
    },
    {
      id: 7,
      privateNumber: "6789012",
      fullName: "נועה כהן",
      command: 'פקע"ר',
    },
    {
      id: 8,
      privateNumber: "7890123",
      fullName: "גיא צוק",
      command: "מרכז",
    },
    {
      id: 9,
      privateNumber: "8901234",
      fullName: "אור מילואימניק",
      command: "דרום",
    },
  ]);

  const [users, setUsers] = useState([]);
  const [unapprovedUsers, setUnapprovedUsers] = useState([]);

  useEffect(() => {
    const fetchDataUsers = async () => {
      try {
        const usersData = await getUsers();

        // Transform the data here
        const userPromises = usersData.map(async (user) => ({
          id: user.id,
          privateNumber: user.privateNumber,
          fullName: user.fullName,
          command: await getCommandNameById(user.commandId),
        }));

        const transformedUsers = await Promise.all(userPromises);

        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error fetching or transforming users:", error);
      }
    };

    const fetchDataUnapprovedUsers = async () => {
      try {
        const unApprovedsersData = await getUnapprovedUsers();

        // Transform the data here
        const unpprovedUserPromises = unApprovedsersData.map(async (user) => ({
          id: user.id,
          privateNumber: user.privateNumber,
          fullName: user.fullName,
          command: await getCommandNameById(user.commandId),
        }));

        const transformedUnapprovedUsers = await Promise.all(
          unpprovedUserPromises
        );

        setUnapprovedUsers(transformedUnapprovedUsers);
      } catch (error) {
        console.error("Error fetching or transforming users:", error);
      }
    };
    fetchDataUsers();
    fetchDataUnapprovedUsers();
  }, [
    users,
    unapprovedUsers,
    getUsers,
    getUnapprovedUsers,
    getCommandNameById,
    setUnapprovedUsers,
    setUsers,
  ]);

  const updateApprovedUser = (newApprovedUser) => {
    const [rows, setRows] = users;
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

          <ManageExistsUsers existUsers={users}></ManageExistsUsers>
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
            unapprovedUsers={unapprovedUsers}
          ></ManageUnapprovedUsers>
        </div>
      </div>
    </div>
  );
}
