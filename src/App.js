import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayOut";
import TablePage from "./pages/TablePage";
// import LoginPage from "./pages/LoginPage";
import Signup from "./components/auth/signup auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Signup /> },
      { path: "/Table", element: <TablePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
