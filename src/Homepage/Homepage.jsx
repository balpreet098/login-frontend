import React, { useEffect, useState } from "react";
import "./homepage.css";
import { Navigate, useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Trigger animation on component mount
  }, []);

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("isUserLogin");

    navigate("/login");
  };

  return (
    <div className={`body ${show ? "show" : ""}`}>
      <div className={`container-home ${show ? "show" : ""}`}>
        <h1>Login Successful!</h1>
        <p>Welcome back, user.</p>
        <div className="main-button">
          <button onClick={logout} type="button" className="logout-btn">
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
