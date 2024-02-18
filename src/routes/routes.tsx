import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { managerPaths } from "./manager.routes";
import { sellerPaths } from "./seller.routes";
import ProtectedRoute from "./../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/superAdmin",
    element: (
      <ProtectedRoute role="superAdmin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/branchManager",
    element: (
      <ProtectedRoute role="branchManager">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(managerPaths),
  },
  {
    path: "/seller",
    element: (
      <ProtectedRoute role="seller">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(sellerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
