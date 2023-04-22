import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import genRefresh from "../helpers/interceptor";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getusers", {
      method: "GET",
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
        setData(data.data);
      });
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
  return (
    <div>
      <Navbar username={user?.username} />
      <div>
        <h1 className="text-3xl font-bold mt-10 mx-3">Users in the Org</h1>
      </div>
      {data?.length > 0 ? (
        <>
          {data?.map((user) => {
            return (
              <>
                <UserCard
                  firstname={user?.first_name}
                  lastname={user?.last_name}
                  username={user?.username}
                  role={user?.role}
                  deletebutton={false}
                />
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default UserPage;
