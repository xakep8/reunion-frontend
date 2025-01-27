import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Notfound from "../pages/Notfound";
import ProjectDetails from "../pages/project_details";
import NewTask from "../pages/tasks/NewTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import Dashboard from "../pages/dashboard";


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/tasks/all" replace /> },
  {
    path: "/notfound",
    element: <Notfound />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AccountLayout>
          <Dashboard/>
        </AccountLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "tasks",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/tasks/all" replace /> },
      {
        path: "all",
        element: <ProjectDetails />,
      },
      {
        path: "new",
        element: <NewTask />,
      },
      {
        path: ":taskID",
        children: [
          { index: true, element: <TaskDetails /> },
        ],
      }
    ],
  },

]);

export default router;
