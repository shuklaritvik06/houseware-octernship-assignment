import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = window.localStorage.getItem("User ID");
  return token?.length > 0 ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
