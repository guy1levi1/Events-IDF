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

  const [users, setUsers] = useState([]);
  // const [rows, setRows] = useState(users);

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

        console.log(transformedUsers);
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

        console.log(transformedUnapprovedUsers);

        setUnapprovedUsers(transformedUnapprovedUsers);
      } catch (error) {
        console.error("Error fetching or transforming users:", error);
      }
    };

    fetchDataUsers();
    fetchDataUnapprovedUsers();
  }, [getUsers, getUnapprovedUsers, getCommandNameById]);

  const updateApprovedUser = (newApprovedUser) => {
    setUsers([{ ...newApprovedUser, id: generateUuid() }, ...users]);
    console.log("New Data in Parent Component:", {
      ...newApprovedUser,
      // id: generateUuid(),
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
