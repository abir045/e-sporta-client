import React, { Children, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    <Spinner aria-label="Default status example" />;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/login"} state={{ from: location }} replace>
      {children}
    </Navigate>
  );
};

export default PrivateRoute;
