import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../server/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const submitBtn2 = useRef(null);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({  username:"",  email: "", password: "" });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,15}$/;
    if (!username.match(usernameRegex)) {
      return "Invalid username format. Username must be 3-16 characters long and can only contain alphanumeric characters, underscores, and hyphens.";
    }
    return "";
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@gmail\.com$/;
    if (!email?.match(emailRegex)) {
      setErrorMessage({ ...errorMessage, email: "Invalid email format" });
      return false;
    }
    setErrorMessage({ ...errorMessage, email: "" });
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!password?.match(passwordRegex)) {
      setErrorMessage({
        ...errorMessage,
        password: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
      return false;
    }
    setErrorMessage({ ...errorMessage, password: "" });
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (  validateUsername()   && validateEmail() && validatePassword()) {
      try {
        await api.post("/register", { username: Username, email, password });
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Navigate after 2 seconds
      } catch (error) {
        console.log("Error during registration:", error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (submitBtn2.current) {
          submitBtn2.current.click();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="main login_container">
      <div className="containesdfgfsdgfdgefgr-background d-flex justify-content-center">
        <div className="centre mx-auto">
          <div className="page d-flex justify-content-center form-center">
            <div className="login-background p-3 rounded">
              <h1 className="d-flex justify-content-center">REGISTER</h1>
              <form onSubmit={handleClick}>
                <div className="mb-4">
                  <label htmlFor="Username">
                    <strong>USERNAME</strong>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="ENTER USERNAME"
                      autoComplete="off"
                      name="username"
                      className="form-control rounded-1 input-field"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                  </div>

                  {errorMessage?.username && (
                  <span style={{ color: "red" }}>{errorMessage?.username}</span>
                )}


                </div>

                <div className="mb-4 input-with-icon">
                  <label htmlFor="email">
                    <strong>EMAIL</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-1 input-field"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                </div>
                {errorMessage?.email && (
                  <span style={{ color: "red" }}>{errorMessage?.email}</span>
                )}

                <div className="mb-4 input-with-icon">
                  <label htmlFor="password">
                    <strong>PASSWORD</strong>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="ENTER PASSWORD"
                    autoComplete="off"
                    name="password"
                    className="form-control rounded-1 input-field"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    required
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="input-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                {errorMessage?.password && (
                  <span style={{ color: "red" }}>{errorMessage?.password}</span>
                )}

                <button
                  ref={submitBtn2}
                  type="submit"
                  className="button-btn btn-default border w-100 rounded-0 text-decoration-none"
                >
                  <h3>REGISTER</h3>
                </button>
              </form>

              <div className="already">
                <p>
                  Already have an account? <Link to="/Login">LOGIN</Link>
                </p>
              </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="success-message">
                <p>Registered successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
