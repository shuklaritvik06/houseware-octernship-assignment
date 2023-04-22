import React from "react";

const UserCard = ({
  firstname,
  lastname,
  username,
  role,
  deletebutton,
  user_id
}) => {
  function handleDelete() {
    fetch("http://localhost:5000/admin/deleteuser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user_id
      }),
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }
  return (
    <div className="h-40 w-64 flex flex-col text-white font-bold m-3  bg-[#cc509c6e] broder-2 border-[#550536] p-2">
      <p>{username}</p>
      <div>
        <p>
          {firstname} {lastname}
        </p>
      </div>
      <p className="bg-pink-700 w-fit p-2 rounded-md">{role}</p>
      {deletebutton && role !== "ADMIN" ? (
        <button
          className="btn  mt-3 btn-accent bg-[#6d1d4f] text-white hover:bg-[#851f5e] border-none"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default UserCard;
