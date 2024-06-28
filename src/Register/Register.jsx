import React from "react";
import { useEffect, useRef, useState } from "react";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import api from "../server/api";
// import

function Register() {
  const submitBtn2 = useRef("");
  const [Username, setUsername] = useState(0);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const [errorMessage, setErrorMessage] = useState({email:"", password:""});

  
  const Navigate = useNavigate();

  const validateEmail = () => {
 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email?.match(emailRegex)) {
      setErrorMessage({...errorMessage,email:"invalid email format"});
      return false;
    }


    setErrorMessage({...errorMessage,email:""});
  
   
    return true;
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!password?.match(passwordRegex)) {
      setErrorMessage(
       {...errorMessage,
        password:"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
       }
      );

      
      return false;
    } 
      setErrorMessage({...errorMessage,password:""});
 
    return true;
  };

  const handleClick = (e) => {
    e.preventDefault(); 
    if (validateEmail() && validatePassword()) {
      try {
        api.post("/register", { username: Username, email, password });
        Navigate("/aftregis");
      } catch (error) {
        // setErrorMessage(errorMessage);
        console.log("euihbsdcvihsadbvc")
      }
    }

    // api.post('/register', {username:Username, email, password})
    //     .then(result => console.log(result))
    //     .catch(err => console.Console.log(err))
  };

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (submitBtn2.current) {
          submitBtn2.current.click();
        }
      }
    });
  }, []);

  return (
    <div className="main login_container">
      <div className="containesdfgfsdgfdgefgr-background d-flex justify-content-center ">
        <div className="centre mx-auto">
          <div className=" page d-flex justify-content-center form-center">
            <div className=" login-background p-3 rounded  ">
              <h1 className="d-flex justify-content-center">REGISTER</h1>
              <form onSubmit={handleClick}>
                <div className="mb-4">
                  <label htmlFor="Username">
                    <strong>USERNAME</strong>{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="ENTER USERNAME"
                    autoComplete="off"
                    name="username"
                    className="form-control rounded-1"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email">
                    <strong>EMAIL</strong>{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="ENTER EMAIL"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-1"
                    onChange={(e) => setEmail(e.target.value)} 
                    onBlur={validateEmail}
                    required
                  />
                </div>
                {errorMessage?.email && (<span style={{ color: "red" }}>{errorMessage?.email}</span>)}

                <div className="mb-4">
                  <label htmlFor="password">
                    <strong>PASSWORD</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="ENTER PASSWORD"
                    autoComplete="off"
                    name="PASSWORD"
                    className="form-control rounded-1"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    required
                  />
                </div>
                {errorMessage?.password && (<span style={{ color: "red" }}>{errorMessage?.password}</span>)}
    
         

                {/* <Link to="/Aftregis" > */}

                <button
                  ref={submitBtn2}
                  type="submit"
                  className=" button-btn btn-default border w-100 rounded-0 text-decoration-none"
                >
                  <h3>REGISTER</h3>
                </button>
                {/* </Link> */}
              </form>

              <div className="already">
                <p>
                  Already have an account? <Link to="/Login">LOGIN</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
