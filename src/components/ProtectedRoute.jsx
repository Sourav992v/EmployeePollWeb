import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  return authedUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
