import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import UserPage from "../screens/UserPage";
import AdminRoute from "../utils/AdminRoute";
import PrivateRoute from "../utils/PrivateRoute";

const RouterComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<UserPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterComponent;
