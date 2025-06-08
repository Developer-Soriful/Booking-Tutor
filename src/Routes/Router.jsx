import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../layouts/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import FindTutors from "../pages/FindTutors";
import AddTutors from "../pages/AddTutors";
import MyBookedTutors from "../pages/MyBookedTutors";
import MyTutorials from "../pages/MyTutorials";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/findTutors",
        element: <FindTutors />,
      },
      {
        path: "/addTutorials",
        element: (
          <ProtectedRoute>
            <AddTutors />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myTutorials",
        element: (
          <ProtectedRoute>
            <MyTutorials />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myBookedTutors",
        element: (
          <ProtectedRoute>
            <MyBookedTutors />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
