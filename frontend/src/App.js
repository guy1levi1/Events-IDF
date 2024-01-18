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
import { AuthContext } from "./utils/contexts/authContext";
import { useAuth } from "./utils/hooks/useAuth";
import ErrorNotFoundPage from "./pages/ErrorNotFound/ErrorNotFoundPage";

const routerNotAuth = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> }, // will be changes to about
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <ErrorNotFoundPage /> },
    ],
  },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> }, // will be changes to about
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
            <EditEventPage />
          </FilenameProvider>
        ),
      },
      {
        path: "/manageEventes",
        element: (
          <FilenameProvider>
            <ManageEventsPage />
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
            <TablePage />
          </FilenameProvider>
        ),
      },
      {
        path: "/crossInformation/:eventId",
        element: (
          <FilenameProvider>
            <CrossInformationTable />
          </FilenameProvider>
        ),
      },

      { path: "/manageUsers", element: <ManageUsersPage /> },
      { path: "*", element: <ErrorNotFoundPage /> },
    ],
  },
]);

function App() {
  const { token, login, logout, userId } = useAuth();
  console.log(token ? router : routerNotAuth);

  console.log("token: " + token);
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
      <RouterProvider router={token ? router : routerNotAuth} />
    </AuthContext.Provider>
  );
}

export default App;
