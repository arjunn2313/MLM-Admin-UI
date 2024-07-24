import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GetRoleFromToken } from "../../utils/getRole";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = GetRoleFromToken();

  
 

  if (!role || !allowedRoles.includes(role)) {
    if (allowedRoles.includes("agent")) {
      return <Navigate to="/signUp" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
