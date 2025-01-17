import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import AllTrainers from "../pages/AllTrainers";

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
    ],
  },
]);
