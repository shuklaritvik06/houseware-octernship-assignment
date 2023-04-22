import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  function handleUsername(e) {
    setData({ ...data, username: e.target.value });
  }
  function handlePassword(e) {
    setData({ ...data, password: e.target.value });
  }
  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((responseData) => {
        var now = new Date();
        var refresh = new Date();
        refresh.setTime(refresh.getTime() + 24 * 3600 * 1000);
        now.setTime(now.getTime() + 1 * 3600 * 1000);
        window.localStorage.setItem("User ID", responseData.user.user_id);
        document.cookie = `access_token=${
          responseData.access_token
        };expires=${now.toUTCString()};path=/`;
        document.cookie = `refresh_token=${
          responseData.refresh_token
        };expires=${refresh.toUTCString()};path=/`;
        if (responseData.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      });
  }
  return window.localStorage.getItem("User ID")?.length > 0 ? (
    navigate("/")
  ) : (
    <>
      <div className="w-screen flex flex-col justify-center h-screen items-center">
        <Logo />
        <form className="flex flex-col gap-10 w-full max-w-md mx-3">
          <input
            type="text"
            placeholder="Username"
            className="input border-[#6d1d4f]"
            name="username"
            onKeyUp={(e) => handleUsername(e)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input  border-[#6d1d4f]"
            name="password"
            onKeyUp={(e) => handlePassword(e)}
          />
          <button
            className="btn btn-accent bg-[#6d1d4f] text-white hover:bg-[#851f5e] border-none"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
