import React from "react";
import useAuth from "../hooks/useAuth";
import useCheckTrainer from "../hooks/usecheckTrainer";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const TrainerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isTrainer, isTrainerLoading] = useCheckTrainer();

  const location = useLocation();

  if (loading || isTrainerLoading) {
    return <Spinner aria-label="Default status example" />;
  }

  if (user && isTrainer) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default TrainerRoute;
