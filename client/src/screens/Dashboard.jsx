import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import genRefresh from "../helpers/interceptor";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
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
        setUsers(data.data);
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
  function handleAdd(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    console.log(username + " " + password + " " + first_name + " ");
    fetch("http://localhost:5000/admin/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        role: "BASIC"
      }),
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
        setOpen(false);
      });
  }
  return (
    <div>
      <Navbar username={user?.username} />
      <div className="flex justify-center">
        <button
          onClick={onOpenModal}
          className="p-2 bg-[#cc2a8e] cursor-pointer text-white font-bold rounded-md mt-5"
        >
          Add User
        </button>
      </div>
      <div className="font-bold text-4xl mt-10 mx-5">Users in the Org</div>
      {users?.length > 0 ? (
        <>
          {users?.map((user) => {
            return (
              <UserCard
                firstname={user?.first_name}
                lastname={user?.last_name}
                username={user?.username}
                role={user?.role}
                key={Math.random()}
                deletebutton={true}
                user_id={user?.user_id}
              />
            );
          })}
        </>
      ) : null}
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="font-bold p-3">Add New User</h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="input border-[#6d1d4f]"
            name="firstname"
            id="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input border-[#6d1d4f]"
            name="lastname"
            id="lastname"
          />
          <input
            type="text"
            placeholder="Username"
            className="input border-[#6d1d4f]"
            name="username"
            id="username"
          />
          <input
            type="password"
            placeholder="Password"
            className="input  border-[#6d1d4f]"
            name="password"
            id="password"
          />
          <button
            className="btn btn-accent bg-[#6d1d4f] text-white hover:bg-[#851f5e] border-none"
            onClick={(e) => handleAdd(e)}
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
