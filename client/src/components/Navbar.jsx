import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  function handleLogout() {
    window.localStorage.removeItem("Role");
    window.localStorage.removeItem("User ID");
    document.cookie = `access_token=; expires=${
      new Date().toUTCString
    }; path=/;`;
    document.cookie = `refresh_token=; expires=${
      new Date().toUTCString
    }; path=/;`;
    navigate("/login");
  }
  return (
    <div className="w-full h-20 bg-[#6d1d4f] flex items-center p-3 justify-between">
      <img src="logo.png" alt="" className="w-20" />
      <div className="flex gap-10 items-center">
        <p className="text-white font-bold">Hello {username} 👋</p>
        <button
          className="bg-[#bb187c] p-2 text-white font-bold rounded-md"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
