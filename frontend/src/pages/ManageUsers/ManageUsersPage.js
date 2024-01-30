import React, { useEffect, useState } from "react";
import ManageExistsUsers from "./ManageExistsUsers";
import ManageUnapprovedUsers from "./ManageUnapprovedUsers";
import generateUuid from "../../utils/GenereateUUID";
import "./ManageUsersPage.css";
import { getUsers } from "../../utils/api/usersApi";
import { getUnapprovedUsers } from "../../utils/api/unapprovedUsersApi";
import { getCommandNameById } from "../../utils/api/commandsApi";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const [unapprovedUsers, setUnapprovedUsers] = useState([]);

  useEffect(() => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
  }, []);

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
  }, [getUsers, getUnapprovedUsers, getCommandNameById]);

  const updateApprovedUser = (newApprovedUser) => {
    setUsers([{ ...newApprovedUser, id: generateUuid() }, ...users]);
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
            updateApprovedUser={updateApprovedUser}
            unapprovedUsers={unapprovedUsers}
          ></ManageUnapprovedUsers>
        </div>
      </div>
    </div>
  );
}
