import React, { useEffect } from "react";
import "./homepage.css";
import { Navigate, useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("isUserLogin");

    navigate("/login");
  };

  return (
    <div className="body">
      <div className="container-home">
        <h1>Login Successful!</h1>
        <p>Welcome back, User!</p>
        <div className="main-button">
          <button onClick={logout} type="button" className="logout-btn">
            {" "}
            <h1>LOG OUT</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
