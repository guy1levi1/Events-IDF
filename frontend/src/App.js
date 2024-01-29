import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayOut/RootLayOut";
import TablePage from "./pages/Table/TablePage";
import LoginPage from "./pages/Login/LoginPage";
import AboutPage from "./pages/About/AboutPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import CreateEventPage from "./pages/CreateEvent/CreateEventPage";
import ManageEventsPage from "./pages/ManageEvents/ManageEventsPage";
import ManageUsersPage from "./pages/ManageUsers/ManageUsersPage";
import CrossInformationTable from "./components/crossInformationTable/CrossInformationTable";
import EditEventPage from "./pages/EditEvent/EditEventPage";
import { FilenameProvider } from "./utils/contexts/FilenameContext";
import { CommandProvider } from "./utils/contexts/commandContext";

import { AuthContext } from "./utils/contexts/authContext";
import { useAuth } from "./utils/hooks/useAuth";
import ErrorNotFoundPage from "./pages/ErrorNotFound/ErrorNotFoundPage";
import { getCommandNameByUserId } from "./utils/api/usersApi";
import { useEffect, useState } from "react";
import TableView from "./components/tableView/TableView";
import { EventIdProvider } from "./utils/contexts/eventIdContext";

const handleRouter = (token, command) => {
  let router;

  if (token && command === "סגל") {
    router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" replace /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "about", element: <AboutPage /> },
          {
            path: "/createEvent",
            element: (
              <FilenameProvider>
                <CreateEventPage />
              </FilenameProvider>
            ),
          },
          {
            path: "/editEvent/:eventId",
            element: (
              <FilenameProvider>
                <CommandProvider>
                  <EditEventPage />
                </CommandProvider>
              </FilenameProvider>
            ),
          },
          {
            path: "/manageEvents",
            element: (
              <FilenameProvider>
                <CommandProvider>
                  <EventIdProvider>
                    <ManageEventsPage />
                  </EventIdProvider>
                </CommandProvider>
              </FilenameProvider>
            ),
          },
          {
            path: "/table/new",
            element: (
              <FilenameProvider>
                <TablePage />
              </FilenameProvider>
            ),
          },
          {
            path: "/table/:eventId",
            element: (
              <FilenameProvider>
                <CommandProvider>
                  <TableView />
                </CommandProvider>
              </FilenameProvider>
            ),
          },
          {
            path: "/crossInformation/:eventId",
            element: (
              <FilenameProvider>
                <EventIdProvider>
                  <CrossInformationTable />
                </EventIdProvider>
              </FilenameProvider>
            ),
          },
          { path: "/manageUsers", element: <ManageUsersPage /> },
          { path: "*", element: <ErrorNotFoundPage /> },
        ],
      },
    ]);
  } else if (token) {
    router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" replace /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "about", element: <AboutPage /> },
          {
            path: "/manageEvents",
            element: (
              <FilenameProvider>
                <CommandProvider>
                  <ManageEventsPage />
                </CommandProvider>
              </FilenameProvider>
            ),
          },
          {
            path: "/table/:eventId",
            element: (
              <FilenameProvider>
                <CommandProvider>
                  <TableView />
                </CommandProvider>
              </FilenameProvider>
            ),
          },

          { path: "*", element: <ErrorNotFoundPage /> },
        ],
      },
    ]);
  } else {
    router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" replace /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "about", element: <AboutPage /> },
          { path: "*", element: <ErrorNotFoundPage /> },
        ],
      },
    ]);
  }

  return router;
};

function App() {
  const { token, login, logout, userId } = useAuth();
  const [command, setCommand] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const commandUser = await getCommandNameByUserId(userId);
        setCommand(commandUser);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {/* <RouterProvider router={token ? router : routerNotAuth} /> */}
      <RouterProvider router={handleRouter(token, command)} />
    </AuthContext.Provider>
  );
}

export default App;
