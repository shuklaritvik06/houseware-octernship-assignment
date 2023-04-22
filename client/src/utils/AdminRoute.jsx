import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const token = window.localStorage.getItem("User ID");
  const [user, setUser] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => {
        if (res.status === 401) {
          genRefresh();
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, []);
  return token?.length > 0 && role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};

export default AdminRoute;
