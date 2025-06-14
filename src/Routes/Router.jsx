import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
// import Home from "../layouts/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../components/ErrorPage";
import React from "react";
import UseAuth from "../Auth/UseAuth";
import { getIdToken } from "firebase/auth";
const Home = React.lazy(() => import("../layouts/Home"));
const AddTutors = React.lazy(() => import("../pages/AddTutors"));
const FindTutors = React.lazy(() => import("../pages/FindTutors"));
const MyBookedTutors = React.lazy(() => import("../pages/MyBookedTutors"));
const MyTutorials = React.lazy(() => import("../pages/MyTutorials"));
const TutorDetails = React.lazy(() => import("../pages/TutorDetails"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        loader: () => fetch("https://a01-server.vercel.app/language_categories"),
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
        path: "/findTutors/:language",
        element: <FindTutors />,
        loader: () =>
          fetch(`https://a01-server.vercel.app/allTutors`).then((res) => res.json()),
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
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tutorDetails/:id",
        element: (
          <ProtectedRoute>
            <TutorDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
