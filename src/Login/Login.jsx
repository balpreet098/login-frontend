// import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../server/api";
// import
// const mongoose = require("mongoose");
// import mongoose  from 'mongoose';

// import { useEffect } from "react";

function Login() {
  const submitBtn = useRef("");

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const [errorInfo, setErrorInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("isUserLogin") || false) {
      navigate("/Homepage");
    }
  }, []);

  function validationInput() {
    let isError = false;

    if (userInfo.email == undefined) {
      setErrorInfo((prevState) => ({
        ...prevState,
        email: true,
      }));
      isError = true;
    }
    if (userInfo.password == undefined) {
      setErrorInfo((prevState) => ({
        ...prevState,
        password: true,
      }));
      isError = true;
    }

    return isError;
  }

  async function loginFormHandler(event) {
    try {
      event.preventDefault();

      if (validationInput()) {
        return;
      }

      const response = await api.post("/login", {
        ...userInfo,
      });

      if (response.data.isUserLogin) {
        console.log(response, "response");

        localStorage.setItem("isUserLogin", true);

        navigate("/Homepage");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (submitBtn.current) {
          submitBtn.current.click();
        }
      }
    });
  }, []);

  console.log(userInfo, "user");

  console.log(errorInfo, "erro");

  return (
    <div className="main login_container">
      <div className="containesdfgfsdgfdgefgr-background d-flex justify-content-center ">
        <div className="centre mx-auto">
          <div className=" page d-flex justify-content-center form-center">
            <div className=" login-background p-3 rounded  ">
              <h1 className="d-flex justify-content-center">LOGIN</h1>

              <form onSubmit={loginFormHandler}>
                <div className="mb-4">
                  <label htmlFor="email">
                    <strong>EMAIL</strong>{" "}
                  </label>

                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-1"
                    onChange={(e) => {
                      setErrorInfo((prevState) => ({
                        ...prevState,
                        [e.target.name]: false,
                      }));
                      setUserInfo((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  {errorInfo?.email && <span>This field is required*</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password">
                    <strong>PASSWORD</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="ENTER PASSWORD"
                    autoComplete="off"
                    name="password"
                    className="form-control rounded-1"
                    onChange={(e) => {
                      setErrorInfo((prevState) => ({
                        ...prevState,
                        [e.target.name]: false,
                      }));
                      setUserInfo((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  {errorInfo?.password && <span>This field is required*</span>}
                </div>

                <div className="remember-forgot">
                  <label htmlFor="remember">
                    <input type="checkbox" />

                    <p>
                      Remember me <a href="#"> Forgot password</a>
                    </p>
                  </label>
                </div>

                <button
                  type="submit"
                  ref={submitBtn}
                  className=" button-btn btn-default border w-100 rounded-0 text-decoration-none"
                >
                  <h3>Login</h3>
                </button>
              </form>

              <div className="register-link">
                <p>
                  Don't have any account? <a href="/Register">Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;