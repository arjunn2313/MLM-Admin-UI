import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GetRoleFromToken } from "../../utils/getRole";
 

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = GetRoleFromToken();

 

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
