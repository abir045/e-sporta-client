import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import AllTrainers from "../pages/AllTrainers";
import TrainerDetails from "../pages/TrainerDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllClasses from "../pages/AllClasses";
import TrainerBooking from "../pages/TrainerBooking";
import Payment from "../pages/Payment";
import BecomeTrainer from "../pages/BecomeTrainer";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../pages/Dashboard/AllUsers";
import Subscribers from "../pages/Dashboard/Subscribers";
import Trainers from "../pages/Dashboard/Trainers";
import AppliedTrainer from "../pages/Dashboard/AppliedTrainer";
import AppliedTrainerDetails from "../pages/Dashboard/AppliedTrainerDetails";
import Balance from "../pages/Dashboard/Balance";
import AddNewClass from "../pages/Dashboard/AddNewClass";
import TrainerManageSlot from "../pages/Dashboard/TrainerManageSlot";
import AddNewSlot from "../pages/Dashboard/AddNewSlot";
import AddNewForum from "../pages/Dashboard/AddNewForum";
import ActivityLog from "../pages/Dashboard/ActivityLog";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import TrainerBooked from "../pages/Dashboard/TrainerBooked";
import AdminRoute from "./AdminRoute";
import TrainerRoute from "./TrainerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/alltrainers",
        element: <AllTrainers />,
      },

      {
        path: "/alltrainers/:id",
        element: <TrainerDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/trainers/${params.id}`),
      },
      {
        path: "/booking",
        element: <TrainerBooking />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/classes",
        element: <AllClasses />,
      },
      {
        path: "/becomeTrainer",
        element: <BecomeTrainer />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      // {
      //   path: "/dashboard/users",
      //   element: <AllUsers />,
      // },
      {
        path: "/dashboard/newsSubscribers",

        element: (
          <AdminRoute>
            <Subscribers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/trainers",

        element: (
          <AdminRoute>
            <Trainers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/appliedTrainer",
        element: (
          <AdminRoute>
            <AppliedTrainer />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/appliedTrainers/:id",
        element: <AppliedTrainerDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/appliedTrainer/${params.id}`),
      },
      {
        path: "/dashboard/balance",
        element: (
          <AdminRoute>
            <Balance />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addNewClass",
        element: (
          <AdminRoute>
            <AddNewClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageSlots",
        element: (
          <TrainerRoute>
            <TrainerManageSlot />
          </TrainerRoute>
        ),
      },
      {
        path: "/dashboard/addNewSlot",
        element: (
          <TrainerRoute>
            <AddNewSlot />
          </TrainerRoute>
        ),
      },
      {
        path: "/dashboard/addNewForum",
        element: <AddNewForum />,
      },

      {
        path: "/dashboard/activityLog",
        element: <ActivityLog />,
      },
      {
        path: "/dashboard/profilePage",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/trainerBooked",
        element: <TrainerBooked />,
      },
    ],
  },
]);
