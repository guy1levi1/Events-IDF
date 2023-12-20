import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayOut/RootLayOut";
import TablePage from "./pages/Table/TablePage";
import LoginPage from "./pages/Login/LoginPage";
import AboutPage from "./pages/About/AboutPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import CreateEventPage from "./pages/CreateEvent/CreateEventPage";
import ManageEventsPage from "./pages/ManageEvents/ManageEventsPage";
// import CrossInformationPage from "./pages/CrossInformation/CrossInformationPage";
import ManageUsersPage from "./pages/ManageUsers/ManageUsersPage";
import TableViewMerge from "./pages/CrossInformation/TableViewMerge"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <AboutPage /> }, // will be changes to about
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "/createEvent", element: <CreateEventPage /> },
      // { path: "/manageEventes", element: <ManageEventsPage /> },
      {
        path: "/manageEventes",
        element: <ManageEventsPage componentCount={4} />,
      },
      { path: "/table", element: <TablePage /> },
      // { path: "/crossInformation", element: <CrossInformationPage /> },
      { path: "/crossInformation", element: <TableViewMerge /> },

      { path: "/manageUsers", element: <ManageUsersPage /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
