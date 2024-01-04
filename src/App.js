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
import { FilenameProvider } from "./components/tableEditing/FilenameContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/about" replace /> }, // will be changes to about
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "/createEvent", element: <CreateEventPage /> },
      { path: "/editEvent/:eventId", element: <EditEventPage /> },
      {
        path: "/manageEventes",
        element: (
          <FilenameProvider>
            <ManageEventsPage />
          </FilenameProvider>
        ),
      },
      {
        path: "/table",
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
        path: "/crossInformation",
        element: (
          <FilenameProvider>
            <CrossInformationTable />
          </FilenameProvider>
        ),
      },

      { path: "/manageUsers", element: <ManageUsersPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
