import React from "react";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";
import useCheckTrainer from "../hooks/usecheckTrainer";

const AdminTrainerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isTrainer, isTrainerLoading] = useCheckTrainer();
  const location = useLocation();

  if (loading || isAdminLoading || isTrainerLoading) {
    return <Spinner aria-label="Default status example" />;
  }

  if (user && (isAdmin || isTrainer)) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminTrainerRoute;
